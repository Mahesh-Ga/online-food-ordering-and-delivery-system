FROM node

WORKDIR /app

COPY ./frontend/admin_frontend/package.json ./frontend/admin_frontend/package-lock.json /app/

RUN npm install

COPY ./frontend/admin_frontend /app

CMD ["npm", "start"]