FROM node as build-stage

WORKDIR /app

COPY ./frontend/customer_frontend/package*.json /app/

RUN npm install

COPY ./frontend/customer_frontend /app

RUN npm run build

FROM nginx:alpine as production-stage

# Copy the build output from the build-stage container to the nginx container
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
