FROM nginx

COPY  ./dist/home /usr/share/nginx/html/
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# docker run -p 8080:80 -d -v F:\PYTHON_CODE\Djiano\blog_rest\by-vue-blog\nginx:/etc/nginx/conf.d/ --name vueBlog vueblog