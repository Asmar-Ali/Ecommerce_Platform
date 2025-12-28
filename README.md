# Porduction ready Ecommerce Platform
A production-ready e-commerce microservices architecture built with Node.js, demonstrating event-driven communication via Apache Kafka, distributed data management, and modern software engineering practices.

## What It Is

This is a **microservices-based e-commerce platform** consisting of three independent services that communicate asynchronously through Apache Kafka. The architecture follows Domain-Driven Design (DDD) principles and implements a repository pattern for clean separation of concerns.

## What It Does

The system manages the core e-commerce workflow:

- **User Service** (Port 9000): Handles user authentication, registration, and JWT token validation
- **Catalog Service** (Port 8000): Manages product catalog with CRUD operations, inventory tracking, and stock management
- **Order Service** (Port 9002): Handles shopping cart operations, order creation, order management, and publishes order events to Kafka

### Service Communication Flow

1. **User Service** → Provides JWT authentication for protected endpoints
2. **Order Service** → Calls Catalog Service via HTTP to fetch product details and stock information
3. **Order Service** → Publishes order events to Kafka topics for async processing
4. **Catalog Service** → (Planned) Subscribes to Kafka events to update inventory and sync with Elasticsearch

## How to Run It

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ and Yarn
- PostgreSQL 14+ (or use Docker containers)

### Step 1: Start Infrastructure Services

**Start Databases:**
```bash
cd db
docker-compose up -d
```

This starts three PostgreSQL instances:
- Catalog DB: `localhost:5432`
- Order DB: `localhost:5433`
- User DB: `localhost:5442`

**Start Kafka Broker:**
```bash
cd broker
docker-compose up -d
```

Kafka will be available at `localhost:9092`, Zookeeper at `localhost:2181`

### Step 2: Set Up Services

**User Service:**
```bash
cd user_service
yarn install
# Set up database schema (see db.sql)
yarn dev
```

**Catalog Service:**
```bash
cd catalog_service
yarn install
# Run Prisma migrations
npx prisma migrate dev
# Or use Makefile
make migrate
yarn dev
```

**Order Service:**
```bash
cd order_service
yarn install
# Run Drizzle migrations
yarn db:migrate
yarn dev
```

### Step 3: Environment Variables

Create `.env` files in each service directory:

**catalog_service/.env:**
```
DATABASE_URL="postgresql://catalog_db:catalog_db_password@localhost:5432/catalog_service"
APP_PORT=8000
```

**order_service/.env:**
```
DATABASE_URL="postgresql://order_db:order_db_password@localhost:5433/order_service"
APP_PORT=9002
CLIENT_ID=order-service
GROUP_ID=order-service-group
BROKER_1=localhost:9092
CATALOG_SERVICE_URL=http://localhost:8000
```

**user_service/.env:**
```
PORT=9000
DATABASE_URL="postgresql://user_db:user_db_password@localhost:5442/user_service"
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
```

### Step 4: Verify Services

- User Service: `http://localhost:9000`
- Catalog Service: `http://localhost:8000`
- Order Service: `http://localhost:9002`

## Key Features

### Architecture

- **Microservices Architecture**: Independent, scalable services with separate databases
- **Event-Driven Communication**: Apache Kafka for asynchronous message passing
- **Repository Pattern**: Clean separation between business logic and data access
- **Dependency Injection**: Services accept repository interfaces for testability

### Technology Stack

**Catalog Service:**
- TypeScript + Express
- Prisma ORM with PostgreSQL
- TypeBox for schema validation
- Pino for structured logging
- Jest + Supertest for testing

**Order Service:**
- TypeScript + Express
- Drizzle ORM with PostgreSQL
- KafkaJS for message broker integration
- HTTP client for inter-service communication
- Rate limiting and CORS support

**User Service:**
- Node.js + Express
- Raw PostgreSQL queries
- JWT authentication with bcrypt
- Simple, lightweight implementation

### Data Management

- **Database per Service**: Each service owns its database (catalog, order, user)
- **Migration Management**: Prisma migrations (catalog) and Drizzle migrations (order)
- **Schema Validation**: Request validation using TypeBox and class-validator

### Testing

- **Unit Tests**: Service layer tests with mocked repositories
- **Integration Tests**: Route tests with Supertest
- **Test Fixtures**: Rosie factory for generating test data
- **Test Coverage**: Jest configuration for both services

## Best Practices

### Code Organization

1. **Layered Architecture**: Routes → Services → Repositories → Database
2. **Interface-Based Design**: Repository interfaces enable easy mocking and testing
3. **Error Handling**: Centralized error handling with custom error classes
4. **Request Validation**: Input validation at route level before business logic
5. **Structured Logging**: Pino logger with HTTP request logging middleware

### Development Practices

1. **TypeScript**: Strong typing across catalog and order services
2. **Environment Configuration**: Environment variables for all configuration
3. **Database Migrations**: Version-controlled schema changes
4. **Code Separation**: Clear boundaries between services, no shared code
5. **API Design**: RESTful endpoints with proper HTTP status codes

### Security

1. **JWT Authentication**: Token-based auth in user service
2. **Password Hashing**: bcrypt for secure password storage
3. **Authorization Middleware**: Request authorizer for protected routes
4. **Input Validation**: Prevents injection and malformed data

### Scalability

1. **Stateless Services**: Services can be horizontally scaled
2. **Async Communication**: Kafka enables decoupled, scalable event processing
3. **Database Isolation**: Each service can scale its database independently
4. **Message Broker**: Kafka topics support multiple consumers and partitions

## Strengths

### Architecture Strengths

- **Service Independence**: Services can be developed, deployed, and scaled independently
- **Technology Diversity**: Different ORMs (Prisma, Drizzle) demonstrate flexibility
- **Event-Driven Design**: Kafka integration enables loose coupling and eventual consistency
- **Clean Code**: Repository pattern and dependency injection make code testable and maintainable

### Engineering Strengths

- **Type Safety**: TypeScript provides compile-time error checking
- **Test Coverage**: Comprehensive test suites with mocking strategies
- **Error Handling**: Custom error classes with proper HTTP status codes
- **Logging**: Structured logging for observability and debugging
- **Validation**: Multi-layer validation (TypeBox, class-validator)

### Operational Strengths

- **Docker Compose**: Easy local development environment setup
- **Migration Management**: Both Prisma and Drizzle migrations are version-controlled
- **Environment Configuration**: Flexible configuration via environment variables
- **Health Checks**: Health check endpoints for service monitoring

### Learning Value

- **Real-World Patterns**: Demonstrates production-ready microservices patterns
- **Multiple ORMs**: Shows different approaches to database management
- **Event-Driven Architecture**: Practical Kafka integration example
- **Testing Strategies**: Shows how to test microservices effectively

## Project Structure

```
├── broker/              # Kafka and Zookeeper Docker setup
├── db/                  # PostgreSQL databases Docker setup
├── catalog_service/     # Product catalog microservice
│   ├── prisma/         # Prisma schema and migrations
│   └── src/
│       ├── api/        # Express routes
│       ├── services/   # Business logic
│       ├── repository/ # Data access layer
│       └── utils/      # Error handling, logging, validation
├── order_service/       # Order and cart management microservice
│   ├── src/
│   │   ├── routes/     # Express routes
│   │   ├── service/    # Business logic
│   │   ├── repository/ # Data access layer
│   │   └── utils/      # Kafka broker, error handling, logging
│   └── db/             # Drizzle schema and migrations
└── user_service/        # User authentication microservice
    ├── routes/         # Auth routes
    └── config/         # Database configuration
```

## API Endpoints

### User Service (Port 9000)
- `POST /register` - User registration
- `POST /login` - User login (returns JWT)
- `GET /validate` - Validate JWT token

### Catalog Service (Port 8000)
- `GET /products` - List products (with pagination)
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `POST /products/stock` - Get stock for multiple products

### Order Service (Port 9002)
- `GET /` - Health check
- `POST /cart` - Add item to cart (requires auth)
- `GET /cart` - Get user's cart (requires auth)
- `PATCH /cart/:id` - Update cart item (requires auth)
- `DELETE /cart/:id` - Remove cart item (requires auth)
- `POST /orders` - Create order from cart (requires auth)
- `GET /orders` - Get user's orders (requires auth)
- `GET /orders/:id` - Get order by ID (requires auth)

## Development Workflow

1. **Start Infrastructure**: Docker Compose for databases and Kafka
2. **Run Migrations**: Set up database schemas
3. **Start Services**: Run each service in development mode
4. **Test APIs**: Use provided `.http` files or Postman
5. **Run Tests**: `yarn test` in each service directory

## Future Enhancements

- [ ] Elasticsearch integration for product search
- [ ] Complete Kafka event handling in catalog service
- [ ] GraphQL API layer
- [ ] API Gateway for unified entry point
- [ ] Service discovery and load balancing
- [ ] Distributed tracing
- [ ] Monitoring and alerting

## Resources

- [YouTube Playlist](https://www.youtube.com/playlist?list=PLaLqLOj2bk9aaZZYoH7tMDj5obE7os45_) - Complete tutorial series
- [Prisma Documentation](https://www.prisma.io/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [KafkaJS Documentation](https://kafka.js.org)

## License

This repository is for educational purposes. Forking is allowed, but distribution or replication without credit is prohibited.

