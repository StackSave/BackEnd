// Main Router

import { Router } from 'express';
import protocolsRouter from './protocols.routes';
import strategiesRouter from './strategies.routes';

const router = Router();

// Mount route modules
router.use('/protocols', protocolsRouter);
router.use('/strategies', strategiesRouter);

export default router;
