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

## 具体的な作業

### DB作成作業

スーパーユーザで行う

```bash
CREATE USER youkai_user WITH  PASSWORD 'youkai_password';
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
CREATE TABLE temp_password (
    password varchar(14)
);

\COPY temp_password(password) from './passwords.txt' with csv

CREATE TABLE found_password (
    id SERIAL NOT NULL,
    password varchar(14) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

INSERT INTO found_password(password) SELECT password FROM temp_password;
```

## テーブル捨て＆ストレージ縮小

スーパーユーザで行う。

```bash
 \timing
DROP TABLE temp_password;
VACUUM FULL;
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

## メモ

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
youkai_password_challenge=> 
```