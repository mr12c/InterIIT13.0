# Dockerfile for React app using Vite

# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the app
RUN npm run build

# Install a lightweight web server to serve the build (e.g., serve)
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Start the app using 'serve' to serve the build directory
CMD ["serve", "-s", "dist", "-l", "3000"]
