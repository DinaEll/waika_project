import { Router } from 'express';
import { forum } from './forum';

export const routes = Router();

routes.use('/forum', forum);
