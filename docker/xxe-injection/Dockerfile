FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
    libxml2-dev \
    && docker-php-ext-install xml \
    && rm -rf /var/lib/apt/lists/*

COPY app/ /var/www/html/

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]
