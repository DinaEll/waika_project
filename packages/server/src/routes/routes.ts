import { Router } from 'express';
import { forum } from './forum';
import { themes } from './themes';

export const routes = Router();

routes.use('/forum', forum);
routes.use('/themes', themes);
