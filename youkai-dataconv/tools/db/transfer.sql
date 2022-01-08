\timing

-- パスワードの両脇の一文字ずつを切った
CREATE TABLE cut_both_sides_password (
    id INTEGER,
    password VARCHAR(12),
    PRIMARY KEY (id)
);

INSERT INTO cut_both_sides_password (id, password)
SELECT id, SUBSTRING(password, 2, 12) FROM found_password;

ALTER TABLE cut_both_sides_password
  ALTER COLUMN password
  SET NOT NULL;

CREATE INDEX pg_trgm_idx_cut_both_sides_password_password
    ON cut_both_sides_password
    USING gin(password gin_trgm_ops);

CREATE INDEX btree_idx_cut_both_sides_password_password
    ON cut_both_sides_password(password);

-- 単語辞書
CREATE TABLE word_dictionary (
    id SERIAL NOT NULL,
    word VARCHAR(14) NOT NULL,
    category VARCHAR(50) NOT NULL,
    only_middle BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    UNIQUE ( word, category )
);

CREATE INDEX btree_idx_word_dictionary_all
    ON word_dictionary(id, word, category, only_middle);

CREATE INDEX btree_idx_word_dictionary_only_middle
    ON word_dictionary(only_middle);



-- パスワードの点数
--CREATE TABLE logical_retio (
--    password_id INTEGER NOT NULL,
--    word_id INTEGER NOT NULL,
--    point INTEGER NOT NULL,
--    PRIMARY KEY (password_id, word_id),
--    FOREIGN KEY (password_id) REFERENCES found_password(id),
--    FOREIGN KEY (word_id) REFERENCES word_dictionary(id)
--);

CREATE TABLE logical_retio (
    password_id INTEGER,
    word_id INTEGER
);

-- 事前処理のためのワークテーブル
CREATE TABLE temp_word (
    word VARCHAR(14) NOT NULL,
    PRIMARY KEY (word)
);


-- 辞書データのインポート
\COPY word_dictionary(word, category) from './頻出/中間助詞.csv' with csv;
UPDATE word_dictionary SET only_middle = TRUE;
j
\COPY word_dictionary(word, category) from './頻出/形容詞等.csv' with csv;

\COPY temp_word(word) from './人名/jinmai_romaji_3-14.txt' with csv;
INSERT INTO word_dictionary (word, category) SELECT word, '人名' FROM temp_word;
TRUNCATE TABLE temp_word;

\COPY temp_word(word) from './名詞/名詞_romaji.txt' with csv;
INSERT INTO word_dictionary (word, category) SELECT word, '名詞' FROM temp_word;
TRUNCATE TABLE temp_word;

\COPY temp_word(word) from './英語/ejdict-hand.txt' with csv;
INSERT INTO word_dictionary (word, category) SELECT word, '英語' FROM temp_word;
TRUNCATE TABLE temp_word;

\COPY temp_word(word) from './一般/bunruidb_romaji_3_14.txt' with csv;
INSERT INTO word_dictionary (word, category) SELECT word, '一般名詞' FROM temp_word;
TRUNCATE TABLE temp_word;

\COPY temp_word(word) from './動詞/動詞_romaji.txt' with csv;
INSERT INTO word_dictionary (word, category) SELECT word, '動詞' FROM temp_word;
TRUNCATE TABLE temp_word;

-- 重複チェック
-- duplicate_delete.sql 参照

-- 集計処理
-- aggregation_processing.sql

-- 点数あり確認

SELECT
    POINTS.password,
    POINTS.point
FROM (
    SELECT
        found_password.password AS password,
        COUNT(found_password.password) AS point
    FROM
        logical_retio INNER JOIN found_password
        ON (logical_retio.password_id = found_password.id)
    GROUP BY
        found_password.password
) AS POINTS
WHERE
    POINTS.point > 1
ORDER BY
    POINTS.point DESC;
