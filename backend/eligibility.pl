% ===============================
% Branch Cutoffs
% ===============================

cutoff(computer, 85).
cutoff(it, 80).
cutoff(electronics, 75).
cutoff(mechanical, 70).
cutoff(civil, 65).

% ===============================
% Category Adjustment
% ===============================

adjustment(open, 0).
adjustment(obc, 5).
adjustment(sc, 10).
adjustment(st, 10).

% ===============================
% Adjusted Cutoff Rule
% ===============================

adjusted_cutoff(Category, Original, Adjusted) :-
    adjustment(Category, Reduction),
    Adjusted is Original - Reduction.

% ===============================
% Eligibility Rule
% ===============================

eligible(StudentID, Branch) :-
    student(StudentID, Percentage, Category),
    cutoff(Branch, Base),
    adjusted_cutoff(Category, Base, Final),
    Percentage >= Final.

% ===============================
% YES / NO RULES
% ===============================

eligible_computer(StudentID, yes) :-
    eligible(StudentID, computer), !.
eligible_computer(_, no).

eligible_it(StudentID, yes) :-
    eligible(StudentID, it), !.
eligible_it(_, no).

eligible_electronics(StudentID, yes) :-
    eligible(StudentID, electronics), !.
eligible_electronics(_, no).

eligible_mechanical(StudentID, yes) :-
    eligible(StudentID, mechanical), !.
eligible_mechanical(_, no).

eligible_civil(StudentID, yes) :-
    eligible(StudentID, civil), !.
eligible_civil(_, no).

% ALL BRANCHES (highest cutoff = computer)
eligible_all(StudentID, yes) :-
    eligible(StudentID, computer), !.
eligible_all(_, no).