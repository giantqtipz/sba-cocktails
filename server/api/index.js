const path = require('path');
const cors = require('cors');
const { app } = require('./server');
const { initRoutes } = require('./routes/index');
const applyMiddleware = require('./middleware');

app.use(cors({ origin: true }));

const indexPath =
  process.env.NODE_ENV === 'production'
    ? process.env.INDEX_PATH
    : '../../public/index.html';

const PORT = process.env.PORT || 3000;

initRoutes();
applyMiddleware();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
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
