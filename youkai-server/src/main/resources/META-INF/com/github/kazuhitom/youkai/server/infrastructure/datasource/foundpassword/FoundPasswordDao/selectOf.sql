SELECT
    password,
    COUNT(password) OVER() AS full_count
FROM
    found_password
WHERE
    password LIKE /* @infix(condition.query()) */'TEST'
LIMIT /* condition.limit() */1
OFFSET /* condition.offset() */0