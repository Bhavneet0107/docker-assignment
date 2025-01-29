# Frontend Dockerfile
# FROM node:16

# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .

# RUN npm run build
# EXPOSE 3000
# CMD ["npm", "start"]

# Use a multi-stage build to reduce final image size
FROM node:16-alpine AS builder

WORKDIR /app

# Copy only necessary files to leverage caching
COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Build the application
RUN npm run build

# Use a lightweight Nginx image for serving the frontend
FROM nginx:alpine

# Copy built files from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
