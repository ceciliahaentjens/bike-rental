# Bike rental – Back-end

The back-end is built with [Node.js](https://nodejs.org/en/), [GraphQL](https://graphql.org/) and [Apollo Server](https://www.apollographql.com/docs/apollo-server/).

## First install

If it’s your first install, please follow these instructions&nbsp;:

```bash
# Copy/paster the .env.example file
cp .env.example .env
# Install dependencies
npm install
```

## Create the database

Run the script to initialize your local database&nbsp;:

```bash
npm run initDB
```

It will create the user `ovelo_u` with the password `ovelo` in the DB `ovelo`.
To reinitialize the database&nbsp;:

```bash
npm run resetDB
```

## Run the API

```bash
npm run dev
```

## Docs

### MCD

[MCD](./docs/MCD.drawio.png)

### Apollo

 Apollo Sandbox&nbsp;: `/`

---

Have fun&nbsp;!
