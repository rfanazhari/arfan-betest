FROM node:18-alpine

# Bundle APP files
COPY ./logs app/logs
COPY ./src app/src
COPY ./package* app/
COPY ./server.js app/
COPY ./.env app/

WORKDIR /app

# RUN chmod 777 wait-for-db.sh

# Install app dependencies
RUN npm cache clear --force
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --silent --progress=false

# Expose the listening port of your app
EXPOSE 3000

# Show current folder structure in logs
# RUN ls -al -R

CMD [ "npm", "start" ]
