FROM nginx:stable-alpine
RUN apk add curl
COPY /build /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --timeout=3s CMD curl -f http://localhost/ || exit 1
ENTRYPOINT ["nginx", "-g", "daemon off;"]
