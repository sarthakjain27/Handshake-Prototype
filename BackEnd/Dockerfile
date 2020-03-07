# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:10.16.3

# Set the working directory to /client
# Delete node_modules and then do docker build
WORKDIR /handshake-backend

# copy package.json into the container at /client
COPY package.json /handshake-backend/

RUN apk add --no-cache make gcc g++ python && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

# Copy the current directory contents into the container at /client
COPY . /handshake-backend/

# Make port 3000 available to the world outside this container
EXPOSE 3001

# Run the app when the container launches
CMD ["npm", "start"]