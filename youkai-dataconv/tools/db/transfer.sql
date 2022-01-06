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
