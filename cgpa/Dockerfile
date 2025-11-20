# 1. Use an official JDK image to build the application
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy the Maven wrapper and pom.xml first (better caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (layer caching)
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

# Copy the actual source code
COPY src src

# Build the Spring Boot JAR
RUN ./mvnw package -DskipTests

# 2. Run stage — much smaller image
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy only the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
