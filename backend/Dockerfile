# Stage 1: Build the bootJar
FROM gradle:8.3-jdk21 AS builder
WORKDIR /app

# Copy Gradle files for dependency caching
COPY ./gradle ./gradle
COPY ./gradlew ./
COPY ./build.gradle.kts ./
COPY ./settings.gradle.kts ./

# Download dependencies
RUN ./gradlew dependencies --no-daemon

# Copy application source code
COPY ./src ./src

# Build the application
RUN ./gradlew bootJar --no-daemon

# Stage 2: Create the runtime image
FROM openjdk:21-jdk-slim
WORKDIR /app

# Copy the bootJar from the build stage
COPY --from=builder /app/build/libs/market-1.0.jar market-1.0.jar

# Copy additional resources if needed
COPY ./src/main/resources/token.properties ./src/main/resources/

# Set the entry point for the application
ENTRYPOINT ["java", "-jar", "market-1.0.jar"]