FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# along with the prisma schema and the rest of your application code.
COPY package*.json ./
COPY . .

# Install app dependencies
RUN npm install


EXPOSE 3000

# Command to run your app
CMD ["npm", "run", "start:dev"]
