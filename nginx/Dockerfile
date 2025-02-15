FROM nginx:alpine

# Copy custom nginx config and .htpasswd file into the container
COPY  nginx.conf /etc/nginx/nginx.conf
COPY .htpasswd /etc/nginx/.htpasswd

# Expose port 80 for nginx
EXPOSE 80
