FROM node:22.14.0-alpine

WORKDIR /app

# Biến môi trường build (dev/prod)
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

COPY package*.json ./

# Cài gọn cho prod, đầy đủ cho dev
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm install --frozen-lockfile --omit=dev; \
    else \
      npm install --frozen-lockfile; \
    fi

COPY . .

# Build nếu là production
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 3000

CMD ["npm", "run", "start"]
