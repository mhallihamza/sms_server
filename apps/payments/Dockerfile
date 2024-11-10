# Base image
FROM node:18-alpine

RUN npm install -g @nestjs/cli

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["nest", "start", "payments"]