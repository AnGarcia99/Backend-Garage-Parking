FROM node:18.12.1-alpine

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install 

EXPOSE 3000

CMD ["npm", "start"]