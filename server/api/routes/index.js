const path = require('path');
const { app } = require('../server');
const { cocktailsRouter } = require('./cocktails');

const routes = [cocktailsRouter];

const initRoutes = () => {
  return routes.forEach((route) => {
    app.use('/api/', route);
  });
};

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../public/index.html'));
});

module.exports = {
  initRoutes,
};
