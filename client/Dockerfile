# Stage 1: Build stage
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package*.json, tsconfig.json, and vite.config.ts files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Install all dependencies
RUN npm install

# Copy other source code files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production stage
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Install serve to run the application
RUN npm install -g serve

# Copy built app from the builder stage
COPY --from=builder /app/dist ./dist

# Set the environment variable for the port
ENV PORT=8080

# Use the PORT environment variable and start the server
CMD serve -s dist -l $PORT