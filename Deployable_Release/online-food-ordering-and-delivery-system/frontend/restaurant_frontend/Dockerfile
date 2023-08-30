FROM node

WORKDIR /app

COPY ./frontend/restaurant_frontend/package.json ./frontend/restaurant_frontend/package-lock.json /app/

RUN npm install

COPY ./frontend/restaurant_frontend /app

CMD ["npm", "start"]