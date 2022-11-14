-- create the databases
CREATE DATABASE IF NOT EXISTS employees;

-- create the users for each database
CREATE USER 'myadmin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'LetMeIn';
GRANT all privileges ON 'employees'.* TO 'myadmin'@'%';
GRANT all privileges ON 'employees'.* TO 'myadmin'@'localhost';

FLUSH PRIVILEGES;
