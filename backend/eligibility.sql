-- ===============================
-- SQL ELIGIBILITY QUERIES
-- ===============================

-- COMPUTER ENGINEERING
SELECT 
CASE 
    WHEN :percentage >= 
        CASE 
            WHEN LOWER(:category) IN ('sc','st') THEN 75
            WHEN LOWER(:category) = 'obc' THEN 80
            ELSE 85
        END
    THEN 'yes' ELSE 'no'
END AS result
FROM dual;

-- IT
SELECT 
CASE 
    WHEN :percentage >= 
        CASE 
            WHEN LOWER(:category) IN ('sc','st') THEN 70
            WHEN LOWER(:category) = 'obc' THEN 75
            ELSE 80
        END
    THEN 'yes' ELSE 'no'
END AS result
FROM dual;

-- MECHANICAL
SELECT 
CASE 
    WHEN :percentage >= 
        CASE 
            WHEN LOWER(:category) IN ('sc','st') THEN 60
            WHEN LOWER(:category) = 'obc' THEN 65
            ELSE 70
        END
    THEN 'yes' ELSE 'no'
END AS result
FROM dual;

-- ELECTRONICS
SELECT 
CASE 
    WHEN :percentage >= 
        CASE 
            WHEN LOWER(:category) IN ('sc','st') THEN 65
            WHEN LOWER(:category) = 'obc' THEN 70
            ELSE 75
        END
    THEN 'yes' ELSE 'no'
END AS result
FROM dual;

-- CIVIL
SELECT 
CASE 
    WHEN :percentage >= 
        CASE 
            WHEN LOWER(:category) IN ('sc','st') THEN 55
            WHEN LOWER(:category) = 'obc' THEN 60
            ELSE 65
        END
    THEN 'yes' ELSE 'no'
END AS result
FROM dual;