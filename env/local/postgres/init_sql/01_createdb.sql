CREATE USER youkai_user WITH SUPERUSER PASSWORD 'youkai_password';
CREATE DATABASE public ENCODING 'UTF8' LC_COLLATE 'C' TEMPLATE 'template0' OWNER 'youkai_user';
ALTER DATABASE public SET timezone TO 'Asia/Tokyo';
