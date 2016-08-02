FROM nginx:alpine

COPY ./conf.d/site.template /etc/nginx/conf.d/site.template
COPY ./public /usr/share/nginx/html
COPY ./config /config

ENV SITE_CONFIG "{}"

CMD envsubst '"$SITE_CONFIG"' < /etc/nginx/conf.d/site.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'