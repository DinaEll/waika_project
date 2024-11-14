import { Router } from '@waika_project/server';
import { forum } from './forum';
import { themes } from './themes';

export const routes = Router();

routes.use('/forum', forum);
routes.use('/themes', themes);
