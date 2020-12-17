const { db } = require('./db');
require('./models/index');

const syncDB = async ({ force = false }) => {
  console.log(`Force = ${force}`);
  try {
    await db.sync({ force });
    console.log('Database synced successfully.');
  } catch (e) {
    console.log('Database failed to sync!');
    throw e;
  }
};

syncDB({ force: process.env.FORCE_DB || true });
