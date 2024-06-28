## Installation

```bash
$ npm install
```

## Running the app

```bash
# create postgres container
$ docker compose up -d

# apply migrations
$ npx prisma migrate deploy

# development
$ npm run start

# watch mode
$ npm run start:dev

```

## API

```
All endpoints are described in the /doc/postman.json file for Postman.
```
