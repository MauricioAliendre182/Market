FROM openjdk:17-jdk-slim
WORKDIR /app
COPY ./gradle/wrapper/market-1.0.jar .
COPY ./src/main/resources/token.properties ./src/main/resources/
ENTRYPOINT ["java", "-jar", "market-1.0.jar"]