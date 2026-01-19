# Base stage
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Dependencies stage
FROM base AS dependencies
RUN npm ci

# Build stage
FROM dependencies AS build
COPY . .
RUN npx prisma generate || true
# Note: we are using TypeORM now, but if prisma client was still needed for some reason we'd keep above.
# Since we switched to TypeORM, we just need to build the nest app.
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
