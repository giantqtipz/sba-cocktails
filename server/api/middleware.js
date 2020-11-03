const path = require('path');
const { app, express } = require('./server');

app.use(express.json());

const DIST_PATH = path.join(__dirname, '../../dist');
const PUBLIC_PATH = path.join(__dirname, '../../public');

const applyMiddleware = () => {
  app.use(express.static(DIST_PATH));
  app.use(express.static(PUBLIC_PATH));
};

module.exports = applyMiddleware;
