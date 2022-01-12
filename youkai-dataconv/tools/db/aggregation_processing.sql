/* 集計処理 */

-- 接続詞等「まんなかに挟まるヤツ」の検索とデータ化
SELECT
    COUNT(cut_both_sides_password.id)
FROM
    cut_both_sides_password INNER JOIN word_dictionary
    ON (cut_both_sides_password.password LIKE '%' || word_dictionary.word || '%')
WHERE
    word_dictionary.only_middle = TRUE
;
-- 4分程度

INSERT INTO logical_retio (password_id, word_id)
SELECT
    cut_both_sides_password.id,
    word_dictionary.id
FROM
    cut_both_sides_password INNER JOIN word_dictionary
    ON (cut_both_sides_password.password LIKE '%' || word_dictionary.word || '%')
WHERE
    word_dictionary.only_middle = TRUE
;
-- 4分半程度

-- 普通の品詞を14文字全体から入ってるものを検索とデータ化
SELECT
    COUNT(found_password.id)
FROM
    found_password INNER JOIN word_dictionary
    ON (found_password.password LIKE '%' || word_dictionary.word || '%')
WHERE
    word_dictionary.only_middle = FALSE
;
-- 12分程度

INSERT INTO logical_retio (password_id, word_id)
SELECT
    found_password.id,
    word_dictionary.id
FROM
    found_password INNER JOIN word_dictionary
    ON (found_password.password LIKE '%' || word_dictionary.word || '%')
WHERE
    word_dictionary.only_middle = FALSE
;
-- 21分程度