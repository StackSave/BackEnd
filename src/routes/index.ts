// Main Router

import { Router } from 'express';
import protocolsRouter from './protocols.routes';
import strategiesRouter from './strategies.routes';
import faucetRouter from './faucet.routes';

const router = Router();

// Mount route modules
router.use('/protocols', protocolsRouter);
router.use('/strategies', strategiesRouter);
router.use('/faucet', faucetRouter);

export default router;
