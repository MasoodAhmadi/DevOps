
#!/bin/sh

envsubst < nginx.conf > /etc/nginx/conf.d/default-config
htpasswd -c -b /etc/nginx/.htpasswd masood ahmadi
nginx -g "daemon off;"