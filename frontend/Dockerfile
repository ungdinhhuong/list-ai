FROM node:22.14.0-alpine

WORKDIR /app

# Biến môi trường build (dev/prod)
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

# Build nếu là production
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 3000

CMD ["npm", "run", "start"]
