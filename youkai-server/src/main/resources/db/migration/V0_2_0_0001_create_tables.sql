CREATE EXTENSION pg_trgm;

CREATE TABLE found_password (
    id SERIAL NOT NULL,
    password varchar(14) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE INDEX pg_trgm_idx_found_password_password
    ON found_password
    USING gin(password gin_trgm_ops);
