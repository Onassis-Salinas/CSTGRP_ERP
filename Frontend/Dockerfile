FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

RUN npm i -g serve

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist", "-l", "3000"]