FROM node:20.17-alpine3.20

WORKDIR /app

RUN apk add --no-cache python3 py3-pip make g++

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
