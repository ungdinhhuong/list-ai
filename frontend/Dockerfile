FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .

# Build production cho prod, không cần build cho dev
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 3000

CMD ["npm", "start"]
