---
title: 巨大パスワードデータのインポート手順
---

デカ過ぎる＆手順を間違えるとめちゃくちゃ時間がかかるので、特殊手順として文字に残す。

## 大まかな手順

1. tempテーブル作る
2. インポート
3. 本チャンテーブル作る
4. 本チャンテーブルにINSERT
5. tempテーブル削除
6. VACUME FULL
7. インデックス作成
8. VACUME FULL

## 前段作業

Cloud SQL Proxy を作業端末に仕込んで置く。

```bash
./cloud_sql_proxy -dir=/cloudsql -instances=[インスタンス接続文字列]
```

サービス化しておくと、やりやすい。

これをつないだ後は `localhost:5432` のPostgresServerとして振る舞う。

## 具体的な作業

### DB作成作業

スーパーユーザで行う

```bash
CREATE USER youkai_user WITH PASSWORD 'youkai_password';
CREATE DATABASE youkai_password_challenge ENCODING 'UTF8' LC_COLLATE 'C' TEMPLATE 'template0';
ALTER DATABASE youkai_password_challenge SET timezone TO 'Asia/Tokyo';
```

### 拡張機能追加

スーパーユーザで、当該DBに接続しつつ行う。

```bash
CREATE EXTENSION pg_trgm;
```

## データインポート

一般ユーザで行う。

```bash
\timing

DROP TABLE found_password;

CREATE TABLE found_password (
    id SERIAL NOT NULL,
    password VARCHAR(14),
    PRIMARY KEY (id)
);

\COPY found_password(password) from './passwords.txt' with csv
  
ALTER TABLE found_password 
  ALTER COLUMN password
  SET NOT NULL;

ALTER TABLE found_password 
  ADD CONSTRAINT found_password_password_unique_key
  UNIQUE(password);
```

## インデックス貼り

一般ユーザで行う。

```bash
\timing
CREATE INDEX pg_trgm_idx_found_password_password
    ON found_password
    USING gin(password gin_trgm_ops);
```

バカっぱやのローカルで4分、非力なクラウドで9時間かかる。

遅かったら、以下のインデクスも張ってみる。

```bash
CREATE INDEX btree_idx_found_password_password
    ON found_password(password);
```

## テーブル捨て＆ストレージ縮小

スーパーユーザで行う。

```bash
\timing
VACUUM FULL;
```

## メモ

### LocalのDockerコンテナ

```bash
INSERT INTO found_password(password) SELECT password FROM temp_password;
43074982
Time: 243703.526 ms (04:03.704)

CREATE INDEX pg_trgm_idx_found_password_password
  ON found_password    
    USING gin(password gin_trgm_ops;              
Time: 348565.713 ms (05:48.566)          
```

### 共有CPUかつ強めのインスタンスでの計測

共有CPU(MEM1.5GBだっけか)のマシンで計測。

ローカルでは、2秒のやつが30秒なので、使い物にならなそう。

```bash
Time: 33134.846 ms (00:33.135)
youkai_password_challenge=> select count(*) from found_password ;
  count   
----------
 43074982
(1 row)

Time: 72783.517 ms (01:12.784)
youkai_password_challenge=> select count(*) from found_password WHERE password LIKE '%MIURA%';
 count 
-------
     4
(1 row)

Time: 33350.426 ms (00:33.350)
```

### メモリ3.75GBの共有CPUじゃないインスタンスでの計測

```bash
youkai_password_challenge=> \COPY temp_password(password) from './passwords.txt' with csv
COPY 43078393
Time: 75132.347 ms (01:15.132)

youkai_password_challenge=> INSERT INTO found_password(password) SELECT password FROM temp_password;
```

なんかこの最中にインスタンスが落ちた。

### メモリ6.5GBの共有CPUじゃないインスタンスでの計測

```bash
\COPY temp_password(password) from './passwords.txt' with csv
Time: 69656.307 ms (01:09.656) 

INSERT INTO found_password(password) SELECT password FROM temp_password;
INSERT 0 43078393
Time: 739845.533 ms (12:19.846)

CREATE INDEX pg_trgm_idx_found_password_password
     ON found_password
     USING gin(password gin_trgm_ops);
Time: 685156.204 ms (11:25.156)

CREATE INDEX btree_idx_found_password_password
     ON found_password(password);
Time: 163681.360 ms (02:43.681)
```

```bash
Time: 170.291 ms
youkai_password_challenge=> SELECT count(password) from found_password WHERE password LIKE 'NMK%';
 count 
-------
  3294
(1 row)

Time: 22.355 ms
youkai_password_challenge=> SELECT count(password) from found_password WHERE password LIKE 'N%';
  count  
---------
 2245741
(1 row)

Time: 6044.153 ms (00:06.044)
youkai_password_challenge=> SELECT count(password) from found_password WHERE password LIKE '%MIURA%';
 count
-------
     4
(1 row)

Time: 21.830 ms
```

一文字、二文字検索はヤバイけれど、それ以外は全然早い。
