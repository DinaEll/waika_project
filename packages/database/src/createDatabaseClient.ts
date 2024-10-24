import { isDevelopment } from '@waika_project/utils';
// eslint-disable-next-line import/default
import pg from 'pg';
import { Sequelize } from 'sequelize-typescript';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../env';
import { Comment, Reply, SiteTheme, Topic, User, UserTheme } from './models';

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
    models: [Comment, Reply, SiteTheme, Topic, User, UserTheme],
    dialectModule: pg,
  });
};
