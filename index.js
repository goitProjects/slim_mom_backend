const startServer = require(`./src/server`);
const { port, databaseUrl } = require(`./src/config`);
const connectToDB = require(`./src/db/coonect-db`);

const DATABASE_URL = process.env.DATABASE_URL || databaseUrl;
const PORT = process.env.PORT || port;

startServer(PORT);
connectToDB(DATABASE_URL);
