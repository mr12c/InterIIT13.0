# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Define environment variables if needed
ENV NODE_ENV=production

# Start the application
CMD ["node", "src/index.js"]