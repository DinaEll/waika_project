import { isDevelopment } from '@waika_project/utils';
import { Sequelize } from 'sequelize-typescript';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../env';
import { User, Topic, Comment, Reply } from './models';

export const createDatabaseClient = (): Sequelize => {
  return new Sequelize({
    dialect: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    // eslint-disable-next-line no-console
    logging: isDevelopment() ? (msg) => console.debug(msg) : undefined,
    models: [User, Topic, Comment, Reply],
  });
};
