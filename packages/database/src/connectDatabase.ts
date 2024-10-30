import { createDatabaseClient } from './createDatabaseClient';

export const connectDatabase = async (
  config: Parameters<typeof createDatabaseClient>[0],
) => {
  try {
    const databaseClient = createDatabaseClient(config);
    await databaseClient.sync({ force: false }); //force: true — пересоздаёт таблицы при каждом запуске (используйте с осторожностью)
    // eslint-disable-next-line no-console
    console.log('  ➜ 🎸 Connected to the database and synchronized models.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
};
