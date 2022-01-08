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


-- 制約・インデックス付与
ALTER TABLE logical_retio
    ADD CONSTRAINT pk_logical_retio
    PRIMARY KEY(password_id, word_id);

ALTER TABLE logical_retio
    ADD FOREIGN KEY (password_id)
    REFERENCES found_password(id);

ALTER TABLE logical_retio
    ADD FOREIGN KEY (word_id)
    REFERENCES word_dictionary(id);


-- 点数あり確認

SELECT COUNT(password) FROM (
SELECT
    found_password.password AS password,
    point2.point AS point
FROM (
    SELECT *
    FROM (
        SELECT
            password_id,
            COUNT(password_id) AS point
        FROM
            logical_retio
        GROUP BY
            password_id
    ) As points
    WHERE
        points.point > 1
) AS point2 INNER JOIN found_password
ON (point2.password_id = found_password.id)
WHERE
    point > 11
ORDER BY
    point DESC

) count_test;


-- 何の品詞が引っかかってるのか確認
SELECT
    ranking_top_60.password,
    ranking_top_60.point,
    word_dictionary.word,
    word_dictionary.category,
    word_dictionary.only_middle

FROM (
    SELECT
        found_password.id AS password_id,
        found_password.password AS password,
        point2.point AS point
    FROM (
        SELECT *
        FROM (
            SELECT
                password_id,
                COUNT(password_id) AS point
            FROM
                logical_retio
            GROUP BY
                password_id
        ) As points
        WHERE
            points.point > 11
    ) AS point2 INNER JOIN found_password
    ON (point2.password_id = found_password.id)
    WHERE
        point > 11
) AS ranking_top_60 INNER JOIN logical_retio
ON (ranking_top_60.password_id = logical_retio.password_Id)
INNER JOIN word_dictionary
ON (logical_retio.word_id = word_dictionary.id)
ORDER BY
    ranking_top_60.point DESC,
    ranking_top_60.password ASC,
    word_dictionary.only_middle DESC,
    word_dictionary.category ASC,
    word_dictionary.word ASC
;

