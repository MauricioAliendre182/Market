# Market - Angular & Spring Boot E-commerce Application

This project is a full-stack e-commerce application built with Angular on the frontend and Spring Boot on the backend. It simulates a marketplace with two types of users: ADMIN and CUSTOMER, each with different access privileges.

## Project Overview

- **Frontend**: Angular application with responsive UI
- **Backend**: Spring Boot REST API
- **Authentication**: JWT-based authentication
- **Database**: PostgreSQL

## Features

- **User Management**:
  - User registration and authentication
  - Role-based access control (ADMIN and CUSTOMER roles)
  
- **Product Management** (ADMIN only):
  - Create, read, update, and delete products
  - Manage product categories
  - Upload product images
  
- **Shopping Experience** (CUSTOMER):
  - Browse products
  - Search and filter products
  - Add products to cart
  - Checkout process
  
- **Order Management**:
  - Place orders (CUSTOMER)
  - View order history (CUSTOMER)
  - Manage all orders (ADMIN)

## Technology Stack

### Frontend
- Angular 14+
- TypeScript
- Angular Material / Bootstrap
- RxJS for state management
- Angular Pipes for data transformation

### Backend
- Spring Boot 2.7+
- Spring Security with JWT
- Spring Data JPA
- RESTful API design
- PostgreSQL database

## Getting Started

### Prerequisites
- Node.js (v14+) and npm
- Java 21+ (for local development)
- Java 21 (for Docker deployment)
- Gradle
- PostgreSQL database
- Docker (optional, for containerized deployment)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Market.git
   cd Market
   ```

2. Configure the database:
   - Open `backend/src/main/resources/application.properties`
   - Update the database connection settings as needed

3. Build and run the backend locally:
   ```bash
   cd backend
   ./gradlew bootRun
   ```

4. The backend API will be available at:
   ```
   http://localhost:8091
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. The application will be available at:
   ```
   http://localhost:4200
   ```

## API Documentation

The backend API is documented using Swagger UI and can be accessed at:
```
http://localhost:8091/swagger-ui.html
```

## User Roles and Permissions

### ADMIN
- Full access to all endpoints
- Can manage products, categories, and users
- Can view and manage all orders

### CUSTOMER
- Limited access to endpoints
- Can browse products and place orders
- Can view their own order history
- Cannot access admin-only features

## Project Structure

```
Market/
├── backend/                # Spring Boot application
│   ├── src/main/java/      # Java source files
│   ├── src/main/resources/ # Configuration files
│   ├── build.gradle.kts    # Gradle build script
│   └── Dockerfile          # Docker configuration
│
├── frontend/               # Angular application
│   ├── src/                # TypeScript source files
│   ├── angular.json        # Angular configuration
│   └── package.json        # npm dependencies
│
└── README.md               # Project documentation
```

## Development

### Backend Development
- The backend follows a layered architecture:
  - Controllers: Handle HTTP requests
  - Services: Implement business logic
  - Repositories: Handle data access
  - Models: Define data structures

### Frontend Development
- The frontend follows Angular best practices:
  - Components: UI building blocks
  - Services: Handle API communication
  - Models: Define data structures
  - Guards: Handle route protection
  - Pipes: Transform data for display

## Deployment

### Backend Deployment

#### Option 1: JAR Deployment
1. Build the JAR file:
   ```bash
   cd backend
   ./gradlew bootJar
   ```
2. Run the JAR file with a specific profile:
   ```bash
   java -jar -Dspring.profiles.active=dev build/libs/market-1.0.jar
   ```

#### Option 2: Docker Deployment
1. Build the Docker image:
   ```bash
   cd backend
   docker build -t market-backend .
   ```
2. Run the Docker container:
   ```bash
   docker run -p 8091:8091 -e "SPRING_PROFILES_ACTIVE=dev" market-backend
   ```

### Frontend Deployment
1. Build the application:
   ```bash
   cd frontend
   ng build --configuration production
   ```
2. Deploy the contents of the `dist/` directory to your web server

#### Docker Compose (Full Stack Deployment)
For deploying both frontend and backend together:

1. Create a docker-compose.yml file in the root directory
2. Run the following command:
   ```bash
   docker-compose up -d
   ```

## Running with Different Profiles

The application supports different profiles for various environments:

```bash
# Development profile
java -jar -Dspring.profiles.active=dev build/libs/market-1.0.jar

# Production profile
java -jar -Dspring.profiles.active=prod build/libs/market-1.0.jar

# Test profile
java -jar -Dspring.profiles.active=test build/libs/market-1.0.jar
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to the Angular and Spring Boot communities for their excellent documentation and support
