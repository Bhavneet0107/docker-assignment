# Backend Dockerfile
# FROM node:16

# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .

# EXPOSE 5000
# CMD ["node", "server.js"]

# Use a smaller base image for production
FROM node:16-alpine AS builder

WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package.json package-lock.json ./

RUN npm install --only=production

# Copy application code
COPY . .

# Use a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5000

CMD ["node", "server.js"]
