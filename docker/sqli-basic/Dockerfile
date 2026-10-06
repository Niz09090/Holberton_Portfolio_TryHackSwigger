FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
    mariadb-server \
    mariadb-client \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY app/ /var/www/html/
COPY entrypoint.sh /entrypoint.sh

RUN chown -R www-data:www-data /var/www/html \
    && chmod +x /entrypoint.sh \
    && sed -i 's/\r//' /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
