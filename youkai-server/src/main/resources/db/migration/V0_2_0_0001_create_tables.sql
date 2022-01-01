CREATE TABLE found_password (
  id integer NOT NULL AUTO_INCREMENT,
  password varchar(14) NOT NULL UNIQUE,
  PRIMARY KEY (id)
)