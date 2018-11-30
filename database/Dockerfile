FROM mariadb:10.4
ENV MYSQL_ROOT_PASSWORD test
EXPOSE 3306
COPY ./init.sql /
RUN mysql -u root -p MYSQL_ROOT_PASSWORD < init.sql
