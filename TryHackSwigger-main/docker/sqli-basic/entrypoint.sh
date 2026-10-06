#!/bin/bash
# Initialize MariaDB data directory if needed
mysql_install_db --user=mysql --datadir=/var/lib/mysql > /dev/null 2>&1

# Start MariaDB
mysqld_safe --user=mysql &
MYSQL_PID=$!

# Wait for MySQL to be ready
echo "Waiting for MySQL..."
for i in $(seq 1 30); do
    if mysqladmin ping -h 127.0.0.1 --silent 2>/dev/null; then
        echo "MySQL is ready!"
        break
    fi
    sleep 1
done

# Setup root user with no password via socket (works on fresh install)
mysql -u root --skip-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '';" 2>/dev/null || true
mysql -u root --skip-password -e "FLUSH PRIVILEGES;" 2>/dev/null || true

# Create database and tables
mysql -u root -h 127.0.0.1 --password='' -e "
CREATE DATABASE IF NOT EXISTS techcorp;
USE techcorp;
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50),
    flag VARCHAR(100)
);
INSERT IGNORE INTO users (id, username, password, flag) 
VALUES (1, 'admin', 'secret123', 'hackforge{sqli_1_union_select_rocks}');
INSERT IGNORE INTO users (id, username, password, flag)
VALUES (2, 'john', 'password1', 'hackforge{sqli_2_second_user}');
"

echo "Database setup complete!"

# Start Apache in foreground
apache2-foreground
