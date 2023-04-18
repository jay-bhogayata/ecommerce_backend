# Use a lightweight Node.js image as the base
FROM node:18-alpine

# Set the working directory for the app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install production dependencies using npm ci
RUN npm ci --only=production

# Copy the app code to the container
COPY . .

# Expose port 80 for the app
EXPOSE 80

# Start the app using npm start
CMD ["npm", "start"]
