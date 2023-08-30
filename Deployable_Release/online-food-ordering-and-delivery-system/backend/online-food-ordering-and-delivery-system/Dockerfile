FROM openjdk:11

WORKDIR /app

COPY ./backend/online-food-ordering-and-delivery-system/target/online-food-ordering-and-delivery-system-0.0.1.war /app/online-food-ordering-and-delivery-system-0.0.1.war

EXPOSE 7070

ENTRYPOINT ["java" , "-jar", "online-food-ordering-and-delivery-system-0.0.1.war"]