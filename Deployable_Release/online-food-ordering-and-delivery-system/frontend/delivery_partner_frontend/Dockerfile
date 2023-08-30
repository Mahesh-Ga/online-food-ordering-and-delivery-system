FROM node

WORKDIR /app

COPY ./frontend/delivery_partner_frontend/package.json ./frontend/delivery_partner_frontend/package-lock.json /app/

RUN npm install

COPY ./frontend/delivery_partner_frontend /app

CMD ["npm", "start"]