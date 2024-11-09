// eslint-disable-next-line import/default
import pg from 'pg';
import { Sequelize } from 'sequelize-typescript';
import { isDev } from '../env';
import { Comment, Reply, SiteTheme, Topic, User, UserTheme } from './models';

interface Config {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export const createDatabaseClient = (config: Config): Sequelize => {
  return new Sequelize({
    ...config,
    dialect: 'postgres',
    // eslint-disable-next-line no-console
    logging: isDev ? (msg) => console.debug(msg) : undefined,
    models: [Comment, Reply, SiteTheme, Topic, User, UserTheme],
    dialectModule: pg,
  });
};
