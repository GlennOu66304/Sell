FROM node:lts-alpine

WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build
COPY deploy .
RUN npm i express

CMD [ "node", "pro.server.js" ]