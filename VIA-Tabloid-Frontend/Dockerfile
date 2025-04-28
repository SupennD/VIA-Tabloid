# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app's files
COPY . .

# Build the app
RUN npm run build

# Expose the port Vite runs on
EXPOSE 5173

# Run the app
CMD ["npm", "run", "dev"]
