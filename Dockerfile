FROM node

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
