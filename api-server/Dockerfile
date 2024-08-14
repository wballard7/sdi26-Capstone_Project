FROM node:alpine

WORKDIR /src

COPY package*.json ./

RUN npm install -g nodemon && \
    npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]
