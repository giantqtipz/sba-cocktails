const serverPath = require('./server/api/index');

const { startServer } = serverPath;

const startApplication = async () => {
  await startServer();
};

startApplication();
