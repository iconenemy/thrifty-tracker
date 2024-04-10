FROM node:21-alpine as development

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

FROM node:21-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .

RUN yarn install --production

COPY --from=development ./app/build ./build

CMD ["node", "build/main.js"]