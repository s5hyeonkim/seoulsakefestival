FROM node:22-bullseye

RUN apt-get update
RUN apt-get install -y nginx openssl

RUN mkdir client
COPY ./srcs/frontend ./client

RUN cd client && npm ci && npm install lucide-react && npm run build
RUN chmod -R 777 /client/dist

RUN cd /

COPY ./conf/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY ./tools/init.sh /init.sh

RUN chmod u+x /init.sh && /init.sh

EXPOSE 443

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
