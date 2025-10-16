import { Router } from 'express';
import {
  getAllProtocols,
  getProtocolByName,
  getProtocolHistory,
  getTopProtocols,
  getProtocolsByCategory,
  getProtocolCategories
} from '../services/database.service';
import logger from '../utils/logger';

const router = Router();

// Get top protocols by APY
router.get('/top', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 4;
    const topProtocols = await getTopProtocols(limit);
    res.json(topProtocols);
  } catch (error) {
    logger.error('Error fetching top protocols:', error);
    res.status(500).json({ error: 'Failed to fetch top protocols' });
  }
});

// Get protocols by category
router.get('/category/:category?', async (req, res) => {
  try {
    const { category } = req.params;
    const protocols = await getProtocolsByCategory(category);
    res.json(protocols);
  } catch (error) {
    logger.error('Error fetching protocols by category:', error);
    res.status(500).json({ error: 'Failed to fetch protocols by category' });
  }
});

// Get all protocol categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await getProtocolCategories();
    res.json(categories);
  } catch (error) {
    logger.error('Error fetching protocol categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get all protocols
router.get('/', async (req, res) => {
  try {
    const protocols = await getAllProtocols();
    res.json(protocols);
  } catch (error) {
    logger.error('Error fetching protocols:', error);
    res.status(500).json({ error: 'Failed to fetch protocols' });
  }
});

// Get single protocol by name
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const protocol = await getProtocolByName(name);

    if (!protocol) {
      return res.status(404).json({ error: 'Protocol not found' });
    }

    res.json(protocol);
  } catch (error) {
    logger.error('Error fetching protocol:', error);
    res.status(500).json({ error: 'Failed to fetch protocol' });
  }
});

// Get protocol APY history
router.get('/:name/history', async (req, res) => {
  try {
    const { name } = req.params;
    const days = parseInt(req.query.days as string) || 7;

    const history = await getProtocolHistory(name, days);
    res.json(history);
  } catch (error) {
    logger.error('Error fetching protocol history:', error);
    res.status(500).json({ error: 'Failed to fetch protocol history' });
  }
});

export default router;
