FROM node:12

# Create app directory
WORKDIR /usr/src/app

# RUN npm install
# If you are building your code for production
COPY ./browser/package.json ./package.json
COPY ./server ./dist/apps/webapp/server
COPY ./browser ./dist/apps/webapp/browser

# Bundle app source

EXPOSE  4200
CMD [ "node", "dist/apps/webapp/server/main.js" ]
