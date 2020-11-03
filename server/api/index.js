const { app } = require('./server');
const applyMiddleware = require('./middleware');
const { initRoutes } = require('./routes/index');

const PORT = process.env.PORT || 3000;

initRoutes();
applyMiddleware();

app.get('/health', (req, res) => {
  res.send({
    message: 'I am healthy.',
  });
});

const startServer = () => {
  return new Promise((res) => {
    app.listen(PORT);
    res();
  });
};

module.exports = {
  startServer,
  app,
};
