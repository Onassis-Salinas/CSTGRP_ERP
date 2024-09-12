FROM node:20.17-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build && npm prune --production

EXPOSE 3000

CMD ["node", "build"]
