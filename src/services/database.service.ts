import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient();

/**
 * Get all protocols from database
 */
export async function getAllProtocols() {
  try {
    return await prisma.protocol.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    logger.error('Error fetching protocols:', error);
    throw error;
  }
}

/**
 * Get protocol by name
 */
export async function getProtocolByName(name: string) {
  try {
    return await prisma.protocol.findUnique({
      where: { name }
    });
  } catch (error) {
    logger.error(`Error fetching protocol ${name}:`, error);
    throw error;
  }
}

/**
 * Get all strategies with their protocols
 */
export async function getAllStrategies() {
  try {
    return await prisma.strategy.findMany({
      include: {
        protocols: {
          include: {
            protocol: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    logger.error('Error fetching strategies:', error);
    throw error;
  }
}

/**
 * Get strategy by name
 */
export async function getStrategyByName(name: string) {
  try {
    return await prisma.strategy.findUnique({
      where: { name },
      include: {
        protocols: {
          include: {
            protocol: true
          }
        }
      }
    });
  } catch (error) {
    logger.error(`Error fetching strategy ${name}:`, error);
    throw error;
  }
}

/**
 * Get top protocols by APY
 */
export async function getTopProtocols(limit: number = 4) {
  try {
    return await prisma.protocol.findMany({
      where: { isActive: true },
      orderBy: { apy: 'desc' },
      take: limit
    });
  } catch (error) {
    logger.error('Error fetching top protocols:', error);
    throw error;
  }
}

/**
 * Get hot/trending vaults (strategies)
 */
export async function getHotVaults(limit: number = 6) {
  try {
    return await prisma.strategy.findMany({
      where: {
        OR: [
          { isHot: true },
          { isFeatured: true }
        ]
      },
      include: {
        protocols: {
          include: {
            protocol: true
          }
        }
      },
      orderBy: { apyCurrent: 'desc' },
      take: limit
    });
  } catch (error) {
    logger.error('Error fetching hot vaults:', error);
    throw error;
  }
}

/**
 * Get protocols by category
 */
export async function getProtocolsByCategory(category?: string) {
  try {
    return await prisma.protocol.findMany({
      where: {
        isActive: true,
        ...(category ? { category } : {})
      },
      orderBy: { apy: 'desc' }
    });
  } catch (error) {
    logger.error('Error fetching protocols by category:', error);
    throw error;
  }
}

/**
 * Get all unique protocol categories
 */
export async function getProtocolCategories() {
  try {
    const protocols = await prisma.protocol.findMany({
      where: { isActive: true },
      select: { category: true },
      distinct: ['category']
    });
    return protocols.map(p => p.category);
  } catch (error) {
    logger.error('Error fetching protocol categories:', error);
    throw error;
  }
}

/**
 * Get strategy breakdown with detailed allocation info
 */
export async function getStrategyBreakdown(strategyName: string) {
  try {
    const strategy = await prisma.strategy.findUnique({
      where: { name: strategyName },
      include: {
        protocols: {
          include: {
            protocol: true
          }
        }
      }
    });

    if (!strategy) {
      throw new Error(`Strategy ${strategyName} not found`);
    }

    return {
      name: strategy.name,
      displayName: strategy.displayName,
      currentAPY: strategy.apyCurrent,
      protocols: strategy.protocols.map(sp => ({
        name: sp.protocol.name,
        displayName: sp.protocol.displayName,
        apy: sp.protocol.apy,
        allocation: sp.allocation,
        contribution: (sp.protocol.apy * sp.allocation) / 100
      }))
    };
  } catch (error) {
    logger.error(`Error getting ${strategyName} breakdown:`, error);
    throw error;
  }
}
