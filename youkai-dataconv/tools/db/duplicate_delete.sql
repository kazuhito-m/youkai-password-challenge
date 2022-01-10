-- カテゴリ違いでの重複チェック
SELECT COUNT(*) FROM (
    SELECT
        word,
        word_cnt
    FROM (
        SELECT COUNT(word) AS word_cnt, word
        FROM word_dictionary
        GROUP BY word
    ) AS word_dictionary_counts
    WHERE
        word_cnt > 1
) AS all_word;

-- 削除のための確認抽出
SELECT
    id,
    word,
    category
FROM
    word_dictionary
WHERE
    word IN
    (
        SELECT
            word
        FROM (
                SELECT COUNT(word) AS word_cnt, word
                FROM word_dictionary
                GROUP BY word
            ) AS word_dictionary_counts
        WHERE
            word_cnt > 1
    )
ORDER BY
    word
;

-- 人名と人名と一般名詞が多そうなので、削除する
DELETE FROM
    word_dictionary
WHERE
    category = '人名'
    AND word IN
    (
        SELECT
            word
        FROM (
                SELECT COUNT(word) AS word_cnt, word
                FROM word_dictionary
                GROUP BY word
            ) AS word_dictionary_counts
        WHERE
            word_cnt > 1
    )
;

DELETE FROM
    word_dictionary
WHERE
    category = '名詞'
    AND word IN
    (
        SELECT
            word
        FROM (
                SELECT COUNT(word) AS word_cnt, word
                FROM word_dictionary
                GROUP BY word
            ) AS word_dictionary_counts
        WHERE
            word_cnt > 1
    )
;

DELETE FROM
    word_dictionary
WHERE
    category = '一般名詞'
    AND word IN
    (
        SELECT
            word
        FROM (
                SELECT COUNT(word) AS word_cnt, word
                FROM word_dictionary
                GROUP BY word
            ) AS word_dictionary_counts
        WHERE
            word_cnt > 1
    )
;

DELETE FROM
    word_dictionary
WHERE
    category = '英語'
    AND word IN
    (
        SELECT
            word
        FROM (
                SELECT COUNT(word) AS word_cnt, word
                FROM word_dictionary
                GROUP BY word
            ) AS word_dictionary_counts
        WHERE
            word_cnt > 1
    )
;

DELETE FROM
    word_dictionary
WHERE
    category = '動詞'
    AND word IN
    (
        SELECT
            word
        FROM (
                SELECT COUNT(word) AS word_cnt, word
                FROM word_dictionary
                GROUP BY word
            ) AS word_dictionary_counts
        WHERE
            word_cnt > 1
    )
;

DELETE FROM
    word_dictionary
WHERE
    category LIKE '接尾辞%'
    AND word IN
    (
        SELECT
            word
        FROM (
                SELECT COUNT(word) AS word_cnt, word
                FROM word_dictionary
                GROUP BY word
            ) AS word_dictionary_counts
        WHERE
            word_cnt > 1
    )
;

DELETE FROM
    word_dictionary
WHERE
    category = '副詞'
    AND word IN
    (
        SELECT
            word
        FROM (
                SELECT COUNT(word) AS word_cnt, word
                FROM word_dictionary
                GROUP BY word
            ) AS word_dictionary_counts
        WHERE
            word_cnt > 1
    )
;

DELETE FROM
    word_dictionary
WHERE
    category LIKE '感動詞%'
    AND word IN
    (
        SELECT
            word
        FROM (
                SELECT COUNT(word) AS word_cnt, word
                FROM word_dictionary
                GROUP BY word
            ) AS word_dictionary_counts
        WHERE
            word_cnt > 1
    )
;

-- 逆引きして「引っかかららないデータ」を削除する

-- 事前バックアップ
CREATE TABLE word_dictionary_full_backup (
    id SERIAL NOT NULL,
    word VARCHAR(14) NOT NULL,
    category VARCHAR(50) NOT NULL,
    only_middle BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    UNIQUE ( word, category )
);
INSERT INTO word_dictionary_full_backup
(id, word, category, only_middle)
SELECT id, word, category, only_middle FROM word_dictionary;

-- 試しに「繋がってるやつ」だけをテンプテーブルにとって見る
CREATE TABLE temp_used_word (
    id INTEGER
);

INSERT INTO temp_used_word (id)
SELECT
    big_words.id
FROM (
    SELECT
        id,
        word
    FROM
        word_dictionary
    WHERE
        CHAR_LENGTH(word) > 3
) AS big_words
INNER JOIN found_password
ON (found_password.password LIKE '%' || big_words.word || '%')
;

INSERT INTO temp_used_word (id)
SELECT
    id
FROM
    word_dictionary
WHERE
    CHAR_LENGTH(word) <= 3
;

CREATE TABLE temp_used_word2 (
    id INTEGER
);


INSERT INTO temp_used_word2(id)
SELECT DISTINCT id FROM temp_used_word;

TRUNCATE TABLE temp_used_word;
INSERT INTO temp_used_word(id)
SELECT id FROM temp_used_word2;

ALTER TABLE temp_used_word
    ADD CONSTRAINT pk_temp_used_word
    PRIMARY KEY(id);
CREATE INDEX btree_idx_temp_used_word_id
    ON temp_used_word(id);

DROP TABLE temp_used_word2;

-- 取ったやつ「以外」を削除。
DELETE FROM
    word_dictionary
WHERE
    NOT EXISTS (
        SELECT 1
        FROM temp_used_word
        WHERE
            id = word_dictionary.id
    )
;

DROP TABLE temp_used_word;
