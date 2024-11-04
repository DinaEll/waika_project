import { createDatabaseClient } from './createDatabaseClient';

export const connectDatabase = async () => {
  try {
    const databaseClient = createDatabaseClient();
    await databaseClient.sync({ force: false, alter: true }); //force: true — пересоздаёт таблицы при каждом запуске (используйте с осторожностью)
    // eslint-disable-next-line no-console
    console.log('  ➜ 🎸 Connected to the database and synchronized models.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
};
