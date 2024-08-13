FROM node:alpine

# WORKDIR /app
ARG CLIENT_DIR=/src
WORKDIR $CLIENT_DIR

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]