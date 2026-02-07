# LogiCore-SRE 🚚📊

A high-performance, observable Logistics Microservice built with **NestJS** and **TypeScript**. Designed with SRE (Site Reliability Engineering) principles to handle high-concurrency shipment processing.

## 🌟 Key Features
- **Logistics Engine:** CRUD operations for shipments and transit legs.
- **SRE Observability:** Integrated with **Prometheus** to expose "Golden Signals" (Latency, Error rates, Event Loop lag).
- **Security:** Custom `ApiKeyGuard` for header-based authentication.
- **Domain Driven:** Modular architecture following SOLID principles.
- **Quality Assurance:** Unit tested with Jest, ensuring 100% logic coverage for security guards.

## 🏗️ Technical Stack
- **Framework:** [NestJS](https://nestjs.com/) (Node.js)
- **Language:** TypeScript
- **Monitoring:** Prometheus / prom-client
- **Security:** Header-based API Key Authentication
- **Testing:** Jest

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
