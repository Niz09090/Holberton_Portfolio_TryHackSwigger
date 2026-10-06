#!/bin/bash
set -e

echo "Starting SQLi Basic Lab..."

# Initialize MariaDB data directory if needed
if [ ! -d "/var/lib/mysql/mysql" ]; then
    echo "Initializing MariaDB data directory..."
    mysql_install_db --user=mysql --datadir=/var/lib/mysql
fi

# Start MariaDB
echo "Starting MariaDB..."
mysqld_safe --user=mysql &
MYSQL_PID=$!

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
for i in $(seq 1 30); do
    if mysqladmin ping -h 127.0.0.1 --silent 2>/dev/null; then
        echo "MySQL is ready!"
        break
    fi
    sleep 1
done

# Setup root user with no password
echo "Setting up root user..."
mysql -u root --skip-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '';" 2>/dev/null || true
mysql -u root --skip-password -e "FLUSH PRIVILEGES;" 2>/dev/null || true

# Create database and tables
echo "Creating database and tables..."
mysql -u root -h 127.0.0.1 --password='' -e "
CREATE DATABASE IF NOT EXISTS techcorp;
USE techcorp;
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50),
    role VARCHAR(20),
    department VARCHAR(50),
    email VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS admin_secrets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    secret_key VARCHAR(100),
    flag VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT IGNORE INTO users (id, username, password, role, department, email) 
VALUES (1, 'admin', 'secret123', 'Administrator', 'IT', 'admin@techcorp.com');
INSERT IGNORE INTO users (id, username, password, role, department, email)
VALUES (2, 'john', 'password1', 'Employee', 'Sales', 'john@techcorp.com');
INSERT IGNORE INTO users (id, username, password, role, department, email)
VALUES (3, 'sarah', 'pass123', 'Employee', 'HR', 'sarah@techcorp.com');
INSERT IGNORE INTO admin_secrets (id, secret_key, flag)
VALUES (1, 'master_key_2024', 'tryhackswigger{sqli_1_union_select_rocks}');
"

echo "Database setup complete!"

# Start Apache in foreground
echo "Starting Apache..."
exec apache2-foreground
