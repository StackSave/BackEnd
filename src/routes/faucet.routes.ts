import { Router } from 'express';
import { requestFaucetTokens, getFaucetHistory } from '../services/database.service';
import logger from '../utils/logger';

const router = Router();

// Request mockIDRX tokens from faucet
router.post('/request', async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'Wallet address is required'
      });
    }

    // Validate ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid wallet address format'
      });
    }

    const result = await requestFaucetTokens(walletAddress);

    if (!result.success) {
      return res.status(429).json(result); // 429 = Too Many Requests
    }

    res.json(result);
  } catch (error) {
    logger.error('Error processing faucet request:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process faucet request'
    });
  }
});

// Get faucet request history for a wallet
router.get('/history/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;

    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return res.status(400).json({ error: 'Invalid wallet address format' });
    }

    const history = await getFaucetHistory(walletAddress);
    res.json(history);
  } catch (error) {
    logger.error('Error fetching faucet history:', error);
    res.status(500).json({ error: 'Failed to fetch faucet history' });
  }
});

export default router;
