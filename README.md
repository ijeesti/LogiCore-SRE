# LogiCore-SRE 🚚📊

A high-performance logistics microservice built with NestJS and TypeScript, designed using Site Reliability Engineering (SRE) principles for handling high-concurrency shipment processing with strong observability, security, and modular architecture.

The system focuses on reliability, operational visibility, and maintainability in distributed backend services.

---

## 🚀 Overview

LogiCore-SRE simulates a production-grade logistics backend responsible for managing shipments and transit workflows.

It demonstrates how to build backend systems that are not only functional but also observable, secure, and designed for failure-aware environments.

Key design focus areas:

- High-throughput API design  
- Observability-first architecture  
- Secure request handling  
- Modular and maintainable domain structure  

---

## 🧠 System Architecture

The service is structured as a modular NestJS application following domain-driven and layered design principles.

### Core Components

**1. Logistics Engine**
- Handles shipment lifecycle management
- Supports CRUD operations for shipments and transit legs
- Designed for extensibility and future workflow expansion

**2. Security Layer**
- Custom API key authentication using request headers
- Centralized `ApiKeyGuard` for route protection
- Designed for stateless authentication in distributed systems

**3. Observability Layer**
- Integrated with Prometheus metrics
- Exposes system-level “Golden Signals”:
  - Request latency
  - Error rates
  - Event loop lag
- Enables operational monitoring and alerting

**4. Application Layer**
- Modular NestJS structure
- Separation of concerns across services, controllers, and domain logic
- Built with SOLID principles in mind

---

## ⚙️ Key Engineering Principles

### 1. SRE-Driven Design
The system is designed with operational reliability as a first-class concern. Metrics and observability are built into the core service rather than added externally.

### 2. Modular Domain Architecture
Each functional area is isolated into modules, enabling:
- Easier scaling
- Independent feature evolution
- Clear ownership boundaries

### 3. Security by Design
API access is controlled using a stateless header-based authentication mechanism, suitable for microservice environments.

### 4. Test-Driven Reliability
Critical components, especially security guards, are fully unit tested to ensure predictable behavior under load and edge conditions.

---

## 📊 Observability

The system exposes Prometheus-compatible metrics focusing on:

- Request latency tracking  
- Error rate monitoring  
- Event loop performance  
- System responsiveness under load  

This enables integration with standard monitoring stacks for production-grade observability.

---

## 🧱 Tech Stack

- **Framework:** NestJS  
- **Language:** TypeScript  
- **Monitoring:** Prometheus (`prom-client`)  
- **Security:** API Key Authentication (Header-based)  
- **Testing:** Jest  

---

## 🔧 Features

- Shipment lifecycle management (CRUD)
- Transit leg tracking
- Secure API key-based access control
- Prometheus metrics exposure
- Modular NestJS architecture
- Fully tested security layer

---

  ## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone [hub.com/ijeesti/LogiCore-SRE/]
   ```
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
