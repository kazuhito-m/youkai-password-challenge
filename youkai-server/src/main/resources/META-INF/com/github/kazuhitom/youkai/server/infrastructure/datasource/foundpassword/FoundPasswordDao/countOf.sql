SELECT
    COUNT(password)
FROM
    found_password
WHERE
    password LIKE /* @infix(condition.query()) */'TEST'
