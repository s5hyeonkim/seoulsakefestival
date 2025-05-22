#!/bin/sh

mkdir -p /etc/nginx/ssl

if [ ! -f /etc/nginx/ssl/hyunjoo.42.fr.crt ] || [ ! -f /etc/nginx/ssl/hyunjoo.42.fr.key ]; then
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/hyunjoo.42.fr.key -out /etc/nginx/ssl/hyunjoo.42.fr.crt \
    -subj "/C=KR/ST=SEOUL/L=GANGNAM/O=42seoul/OU=hyunjoo/CN=hyunjoo.42.fr"
fi
