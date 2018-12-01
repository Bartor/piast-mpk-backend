FROM node:8.14-jessie
WORKDIR /usr/src/app

COPY . .
RUN npm install
EXPOSE 2137
CMD [ "npm", "start" ]
