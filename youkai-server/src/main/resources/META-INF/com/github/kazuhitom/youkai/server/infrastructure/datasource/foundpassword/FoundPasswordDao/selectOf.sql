SELECT
    password,
    COUNT(password) OVER() AS full_count
FROM
    found_password
WHERE
    password LIKE /* @infix(part) */'TEST'
