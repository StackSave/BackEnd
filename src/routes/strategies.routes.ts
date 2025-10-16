import { Router } from 'express';
import { getStrategyByName, getAllStrategies, getHotVaults, getStrategyBreakdown } from '../services/database.service';
import logger from '../utils/logger';

const router = Router();

// Get hot/trending vaults
router.get('/hot', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 6;
    const hotVaults = await getHotVaults(limit);
    res.json(hotVaults);
  } catch (error) {
    logger.error('Error fetching hot vaults:', error);
    res.status(500).json({ error: 'Failed to fetch hot vaults' });
  }
});

// Get all strategies
router.get('/', async (req, res) => {
  try {
    const strategies = await getAllStrategies();
    res.json(strategies);
  } catch (error) {
    logger.error('Error fetching strategies:', error);
    res.status(500).json({ error: 'Failed to fetch strategies' });
  }
});

// Get single strategy by name
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const strategy = await getStrategyByName(name);

    if (!strategy) {
      return res.status(404).json({ error: 'Strategy not found' });
    }

    res.json(strategy);
  } catch (error) {
    logger.error('Error fetching strategy:', error);
    res.status(500).json({ error: 'Failed to fetch strategy' });
  }
});

// Get strategy breakdown with detailed allocation info
router.get('/:name/breakdown', async (req, res) => {
  try {
    const { name } = req.params;
    const breakdown = await getStrategyBreakdown(name);
    res.json(breakdown);
  } catch (error) {
    logger.error('Error fetching strategy breakdown:', error);
    res.status(500).json({ error: 'Failed to fetch strategy breakdown' });
  }
});

export default router;