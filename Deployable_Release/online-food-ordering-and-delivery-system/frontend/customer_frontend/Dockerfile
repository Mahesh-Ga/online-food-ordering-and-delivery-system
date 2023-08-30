FROM node

WORKDIR /app

COPY ./frontend/customer_frontend/package.json ./frontend/customer_frontend/package-lock.json ./frontend/customer_frontend/yarn.lock /app/

RUN npm install
RUN yarn install

COPY ./frontend/customer_frontend /app

CMD ["npm", "start"]