FROM node:22.14.0

WORKDIR /srv/app

COPY package.json package-lock.json ./

RUN npm install

COPY --chown=node:node . .

RUN chown -R node:node /srv/app

USER node

EXPOSE 1337

CMD ["npm", "run", "dev"]