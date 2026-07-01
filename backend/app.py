from flask import Flask, request, jsonify
from flask_cors import CORS
import oracledb
from pyswip import Prolog

# Oracle Instant Client path
oracledb.init_oracle_client(lib_dir=r"C:\oracle\instantclient")

app = Flask(__name__)
CORS(app)

dsn = oracledb.makedsn("localhost", 1521, service_name="XE")

# ===============================
# HOME
# ===============================
@app.route('/')
def home():
    return "Backend is running successfully!"

# ===============================
# ADD STUDENT
# ===============================
@app.route('/add-student', methods=['POST'])
def add_student():
    connection = None
    cursor = None

    try:
        data = request.json

        filtered_data = {
            "name": data.get("name"),
            "studentId": data.get("studentId"),
            "email": data.get("email"),
            "phone": data.get("phone"),
            "gender": data.get("gender"),
            "category": data.get("category"),
            "physics": int(data.get("physics")) if data.get("physics") else None,
            "chemistry": int(data.get("chemistry")) if data.get("chemistry") else None,
            "maths": int(data.get("maths")) if data.get("maths") else None,
            "percentage": float(data.get("percentage")) if data.get("percentage") else None,
            "jeeScore": int(data.get("jeeScore")) if data.get("jeeScore") else None,
            "cetScore": int(data.get("cetScore")) if data.get("cetScore") else None,
            "preferredBranch": data.get("preferredBranch")
        }

        connection = oracledb.connect(user="system", password="oracle", dsn=dsn)
        cursor = connection.cursor()

        query = """
        INSERT INTO STUDENTS (
            NAME, STUDENT_ID, EMAIL, PHONE, GENDER, CATEGORY,
            PHYSICS, CHEMISTRY, MATHS,
            PERCENTAGE, JEE_SCORE, CET_SCORE,
            PREFERRED_BRANCH
        )
        VALUES (
            :name, :studentId, :email, :phone, :gender, :category,
            :physics, :chemistry, :maths,
            :percentage, :jeeScore, :cetScore,
            :preferredBranch
        )
        """

        cursor.execute(query, filtered_data)
        connection.commit()

        return jsonify({"message": "Data saved successfully"})

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# ===============================
# FETCH FULL DATA
# ===============================
@app.route('/students-full', methods=['GET'])
def get_students_full():
    connection = oracledb.connect(user="system", password="oracle", dsn=dsn)
    cursor = connection.cursor()

    cursor.execute("""
        SELECT 
            STUDENT_ID, NAME, EMAIL, PHONE, GENDER, CATEGORY,
            PHYSICS, CHEMISTRY, MATHS,
            PERCENTAGE, JEE_SCORE, CET_SCORE,
            PREFERRED_BRANCH
        FROM STUDENTS
    """)

    students = []
    for row in cursor:
        students.append({
            "student_id": row[0],
            "name": row[1],
            "gender": row[4],
            "category": row[5],
            "physics": row[6],
            "chemistry": row[7],
            "maths": row[8],
            "percentage": row[9],
            "jee": row[10],
            "cet": row[11],
            "branch": row[12]
        })

    cursor.close()
    connection.close()

    return jsonify(students)

# ===============================
# PROLOG
# ===============================
def generate_prolog_file():
    connection = oracledb.connect(user="system", password="oracle", dsn=dsn)
    cursor = connection.cursor()

    cursor.execute("SELECT STUDENT_ID, PERCENTAGE, CATEGORY FROM STUDENTS")

    with open("students.pl", "w") as f:
        for sid, percent, cat in cursor:
            cat = cat.lower() if cat else "open"
            f.write(f"student('{sid}', {percent}, {cat}).\n")

    cursor.close()
    connection.close()

def safe_query(prolog, query):
    try:
        result = list(prolog.query(query))
        return result[0]["X"] if result else "no"
    except:
        return "no"

def check_eligibility(student_id):
    generate_prolog_file()

    prolog = Prolog()
    prolog.consult("students.pl")
    prolog.consult("eligibility.pl")

    return {
        "computer": safe_query(prolog, f"eligible_computer('{student_id}', X)"),
        "it": safe_query(prolog, f"eligible_it('{student_id}', X)"),
        "electronics": safe_query(prolog, f"eligible_electronics('{student_id}', X)"),
        "mechanical": safe_query(prolog, f"eligible_mechanical('{student_id}', X)"),
        "civil": safe_query(prolog, f"eligible_civil('{student_id}', X)"),
        "all": safe_query(prolog, f"eligible_all('{student_id}', X)")
    }

# ===============================
# SQL ELIGIBILITY (NEW)
# ===============================
def check_sql_eligibility(student_id):
    connection = oracledb.connect(user="system", password="oracle", dsn=dsn)
    cursor = connection.cursor()

    cursor.execute("""
        SELECT PERCENTAGE, CATEGORY 
        FROM STUDENTS 
        WHERE STUDENT_ID = :id
    """, {"id": student_id})

    row = cursor.fetchone()

    if not row:
        return {}

    percentage, category = row
    category = category.lower() if category else "open"

    # LOAD SQL FILE
    with open("eligibility.sql", "r") as f:
        queries = f.read().split(";")

    labels = ["computer", "it", "mechanical", "electronics", "civil"]
    results = {}

    i = 0
    for q in queries:
        q = q.strip()
        if not q:
            continue

        cursor.execute(q, {
            "percentage": percentage,
            "category": category
        })

        results[labels[i]] = cursor.fetchone()[0]
        i += 1

    cursor.close()
    connection.close()

    return results

# ===============================
# APIs
# ===============================
@app.route('/check-eligibility/<student_id>', methods=['GET'])
def get_prolog(student_id):
    return jsonify(check_eligibility(student_id))

@app.route('/check-sql-eligibility/<student_id>', methods=['GET'])
def get_sql(student_id):
    return jsonify(check_sql_eligibility(student_id))

# ===============================
# RUN
# ===============================
if __name__ == '__main__':
    app.run(debug=True)