FROM node:16-alpine

# Create app directory
# This is the container in our image
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

# Env setup
#COPY .env.development .env

# Expose port and begin application
RUN npm run build

EXPOSE 8080

# Start the appo
CMD ["npm", "run", "start:dev"]
