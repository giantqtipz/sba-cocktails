/* eslint-disable import/no-unresolved */
const { startServer } = require('./public/server/api/index');

const startApplication = async () => {
  await startServer();
};

startApplication();
