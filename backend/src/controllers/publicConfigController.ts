import { Router } from 'express';
import { serverConfig } from '../config/env.js';

export const publicConfigRouter = Router();

publicConfigRouter.get('/', (_request, response) => {
  response.status(200).json(serverConfig.publicConfig);
});
