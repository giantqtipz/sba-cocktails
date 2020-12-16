const { app } = require('../server');
const { cocktailsRouter } = require('./cocktails');

const routes = [cocktailsRouter];

const initRoutes = () => {
  console.log(cocktailsRouter);
  return routes.forEach((route) => {
    app.use('/api/', route);
  });
};

module.exports = {
  initRoutes,
};
