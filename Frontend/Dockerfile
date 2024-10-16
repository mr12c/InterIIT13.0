# Dockerfile for running React app using Vite in development mode

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

# Expose the port Vite will run on
EXPOSE 5173

# Start the app using Vite
CMD ["npm", "run", "dev"]
