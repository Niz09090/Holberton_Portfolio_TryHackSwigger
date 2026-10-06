FROM php:8.1-apache

COPY app/ /var/www/html/

# Create flag file at /flag.txt
RUN echo 'tryhackswigger{lfi_file_reader_flag}' > /flag.txt

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]
