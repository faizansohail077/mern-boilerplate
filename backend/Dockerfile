FROM node:21
WORKDIR /usr/src/backend

COPY package.json package-lock.json ./
RUN npm install

COPY . .
EXPOSE 3002

CMD ["npm","run","dev"]