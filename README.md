[![nodejs](https://img.shields.io/badge/Server-Node.js-%23339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![typescript](https://img.shields.io/badge/-TypeScript-%23007ACC?style=flat-square&logo=TYPESCRIPT)](https://www.typescriptlang.org/)


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Seed database

```bash
# Clear database
$ npm run clear

# Seed database
$ npm run seed
```

## Running the tests

```bash
# run all e2e tests
$ npm run test:e2e

# run a specific e2e test
$jest --config ./test/jest-e2e.json -- user.e2e-spec.ts

# run unittests
$ npm run test
```

### Docker build &nbsp;:whale:

```bash
# set the env
$ cp .env-example .env

# start all containers
$ docker-compose up -d

# start a specific container
$ docker-compose up -d mongodb

# if a new package has been installed, need to run this command to rebuild
$ docker-compose up --build -V
```
