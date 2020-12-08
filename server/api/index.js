const path = require('path');
const { app } = require('./server');
const applyMiddleware = require('./middleware');
const { initRoutes } = require('./routes/index');

const PORT = process.env.PORT || 3000;

initRoutes();
applyMiddleware();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
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
