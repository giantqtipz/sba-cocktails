/* eslint-disable import/no-unresolved */
const { startServer } = require('./server/api/index');

const startApplication = async () => {
  await startServer();
};

startApplication();
