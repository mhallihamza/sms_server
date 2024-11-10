# Base image
FROM node:18-alpine

RUN npm install -g @nestjs/cli
cd c
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY server/package.json server/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY ./server .

# Expose port
EXPOSE 3000

# Start the application
CMD ["nest", "start", "api-gateway"]