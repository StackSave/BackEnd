import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with IDRX pairs...');

  // Create protocols
  const aave = await prisma.protocol.upsert({
    where: { name: 'aave' },
    update: {},
    create: {
      name: 'aave',
      displayName: 'Aave V3',
      description: 'Leading decentralized lending protocol',
      category: 'Lending',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7278.png',
      apy: 3.2,
      tvl: 11500000000,
      isActive: true
    }
  });

  const moonwell = await prisma.protocol.upsert({
    where: { name: 'moonwell' },
    update: {},
    create: {
      name: 'moonwell',
      displayName: 'Moonwell',
      description: 'Open lending and borrowing protocol',
      category: 'Lending',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/26498.png',
      apy: 4.8,
      tvl: 245000000,
      isActive: true
    }
  });

  const aerodrome = await prisma.protocol.upsert({
    where: { name: 'aerodrome' },
    update: {},
    create: {
      name: 'aerodrome',
      displayName: 'Aerodrome',
      description: 'Next-generation AMM on Base',
      category: 'DEX',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/28583.png',
      apy: 12.5,
      tvl: 850000000,
      isActive: true
    }
  });

  const seamless = await prisma.protocol.upsert({
    where: { name: 'seamless' },
    update: {},
    create: {
      name: 'seamless',
      displayName: 'Seamless Protocol',
      description: 'Integrated DeFi protocol for Base',
      category: 'Yield Optimizer',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/29636.png',
      apy: 5.1,
      tvl: 180000000,
      isActive: true
    }
  });

  console.log('✅ Protocols created');

  // Create IDRX pair strategies (vaults)
  const kaitoIdrx = await prisma.strategy.upsert({
    where: { name: 'kaito-idrx' },
    update: {},
    create: {
      name: 'kaito-idrx',
      displayName: 'KAITO/IDRX',
      description: 'High-growth AI token paired with IDRX',
      apyCurrent: 24.3,
      riskLevel: 'Higher',
      lockPeriod: 30,
      minDeposit: 500,
      category: 'Growth',
      isFeatured: false,
      isHot: true,
      tvl: 1200000
    }
  });

  const morphIdrx = await prisma.strategy.upsert({
    where: { name: 'morph-idrx' },
    update: {},
    create: {
      name: 'morph-idrx',
      displayName: 'MORPH/IDRX',
      description: 'Layer 2 infrastructure token paired with IDRX',
      apyCurrent: 18.7,
      riskLevel: 'Medium',
      lockPeriod: 7,
      minDeposit: 200,
      category: 'Balanced',
      isFeatured: false,
      isHot: true,
      tvl: 850000
    }
  });

  const ethIdrx = await prisma.strategy.upsert({
    where: { name: 'eth-idrx' },
    update: {},
    create: {
      name: 'eth-idrx',
      displayName: 'ETH/IDRX',
      description: 'Ethereum paired with IDRX for stable returns',
      apyCurrent: 5.4,
      riskLevel: 'Low',
      lockPeriod: 0,
      minDeposit: 100,
      category: 'Conservative',
      isFeatured: true,
      isHot: false,
      tvl: 15800000
    }
  });

  const usdcIdrx = await prisma.strategy.upsert({
    where: { name: 'usdc-idrx' },
    update: {},
    create: {
      name: 'usdc-idrx',
      displayName: 'USDC/IDRX',
      description: 'Stablecoin paired with IDRX for maximum stability',
      apyCurrent: 4.2,
      riskLevel: 'Low',
      lockPeriod: 0,
      minDeposit: 50,
      category: 'Stable',
      isFeatured: true,
      isHot: false,
      tvl: 28500000
    }
  });

  const baseIdrx = await prisma.strategy.upsert({
    where: { name: 'base-idrx' },
    update: {},
    create: {
      name: 'base-idrx',
      displayName: 'BASE/IDRX',
      description: 'Base ecosystem token paired with IDRX',
      apyCurrent: 32.1,
      riskLevel: 'Higher',
      lockPeriod: 30,
      minDeposit: 500,
      category: 'Aggressive',
      isFeatured: true,
      isHot: true,
      tvl: 2800000
    }
  });

  const linkIdrx = await prisma.strategy.upsert({
    where: { name: 'link-idrx' },
    update: {},
    create: {
      name: 'link-idrx',
      displayName: 'LINK/IDRX',
      description: 'Chainlink oracle token paired with IDRX',
      apyCurrent: 8.9,
      riskLevel: 'Medium',
      lockPeriod: 7,
      minDeposit: 200,
      category: 'Balanced',
      isFeatured: false,
      isHot: false,
      tvl: 5400000
    }
  });

  const arbIdrx = await prisma.strategy.upsert({
    where: { name: 'arb-idrx' },
    update: {},
    create: {
      name: 'arb-idrx',
      displayName: 'ARB/IDRX',
      description: 'Arbitrum token paired with IDRX',
      apyCurrent: 15.3,
      riskLevel: 'Medium',
      lockPeriod: 14,
      minDeposit: 300,
      category: 'Growth',
      isFeatured: false,
      isHot: false,
      tvl: 3200000
    }
  });

  const opIdrx = await prisma.strategy.upsert({
    where: { name: 'op-idrx' },
    update: {},
    create: {
      name: 'op-idrx',
      displayName: 'OP/IDRX',
      description: 'Optimism token paired with IDRX',
      apyCurrent: 11.6,
      riskLevel: 'Medium',
      lockPeriod: 7,
      minDeposit: 200,
      category: 'Balanced',
      isFeatured: false,
      isHot: false,
      tvl: 2900000
    }
  });

  console.log('✅ IDRX pair strategies created');

  // Create strategy-protocol allocations

  // KAITO/IDRX: 50% Aerodrome + 30% Moonwell + 20% Seamless
  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: kaitoIdrx.id,
        protocolId: aerodrome.id
      }
    },
    update: {},
    create: {
      strategyId: kaitoIdrx.id,
      protocolId: aerodrome.id,
      allocation: 50
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: kaitoIdrx.id,
        protocolId: moonwell.id
      }
    },
    update: {},
    create: {
      strategyId: kaitoIdrx.id,
      protocolId: moonwell.id,
      allocation: 30
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: kaitoIdrx.id,
        protocolId: seamless.id
      }
    },
    update: {},
    create: {
      strategyId: kaitoIdrx.id,
      protocolId: seamless.id,
      allocation: 20
    }
  });

  // MORPH/IDRX: 40% Moonwell + 35% Aerodrome + 25% Aave
  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: morphIdrx.id,
        protocolId: moonwell.id
      }
    },
    update: {},
    create: {
      strategyId: morphIdrx.id,
      protocolId: moonwell.id,
      allocation: 40
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: morphIdrx.id,
        protocolId: aerodrome.id
      }
    },
    update: {},
    create: {
      strategyId: morphIdrx.id,
      protocolId: aerodrome.id,
      allocation: 35
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: morphIdrx.id,
        protocolId: aave.id
      }
    },
    update: {},
    create: {
      strategyId: morphIdrx.id,
      protocolId: aave.id,
      allocation: 25
    }
  });

  // ETH/IDRX: 60% Aave + 40% Moonwell
  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: ethIdrx.id,
        protocolId: aave.id
      }
    },
    update: {},
    create: {
      strategyId: ethIdrx.id,
      protocolId: aave.id,
      allocation: 60
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: ethIdrx.id,
        protocolId: moonwell.id
      }
    },
    update: {},
    create: {
      strategyId: ethIdrx.id,
      protocolId: moonwell.id,
      allocation: 40
    }
  });

  // USDC/IDRX: 70% Aave + 30% Moonwell
  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: usdcIdrx.id,
        protocolId: aave.id
      }
    },
    update: {},
    create: {
      strategyId: usdcIdrx.id,
      protocolId: aave.id,
      allocation: 70
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: usdcIdrx.id,
        protocolId: moonwell.id
      }
    },
    update: {},
    create: {
      strategyId: usdcIdrx.id,
      protocolId: moonwell.id,
      allocation: 30
    }
  });

  // BASE/IDRX: 55% Aerodrome + 25% Seamless + 20% Moonwell
  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: baseIdrx.id,
        protocolId: aerodrome.id
      }
    },
    update: {},
    create: {
      strategyId: baseIdrx.id,
      protocolId: aerodrome.id,
      allocation: 55
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: baseIdrx.id,
        protocolId: seamless.id
      }
    },
    update: {},
    create: {
      strategyId: baseIdrx.id,
      protocolId: seamless.id,
      allocation: 25
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: baseIdrx.id,
        protocolId: moonwell.id
      }
    },
    update: {},
    create: {
      strategyId: baseIdrx.id,
      protocolId: moonwell.id,
      allocation: 20
    }
  });

  // LINK/IDRX: 45% Moonwell + 35% Aave + 20% Aerodrome
  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: linkIdrx.id,
        protocolId: moonwell.id
      }
    },
    update: {},
    create: {
      strategyId: linkIdrx.id,
      protocolId: moonwell.id,
      allocation: 45
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: linkIdrx.id,
        protocolId: aave.id
      }
    },
    update: {},
    create: {
      strategyId: linkIdrx.id,
      protocolId: aave.id,
      allocation: 35
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: linkIdrx.id,
        protocolId: aerodrome.id
      }
    },
    update: {},
    create: {
      strategyId: linkIdrx.id,
      protocolId: aerodrome.id,
      allocation: 20
    }
  });

  // ARB/IDRX: 50% Aerodrome + 30% Seamless + 20% Moonwell
  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: arbIdrx.id,
        protocolId: aerodrome.id
      }
    },
    update: {},
    create: {
      strategyId: arbIdrx.id,
      protocolId: aerodrome.id,
      allocation: 50
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: arbIdrx.id,
        protocolId: seamless.id
      }
    },
    update: {},
    create: {
      strategyId: arbIdrx.id,
      protocolId: seamless.id,
      allocation: 30
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: arbIdrx.id,
        protocolId: moonwell.id
      }
    },
    update: {},
    create: {
      strategyId: arbIdrx.id,
      protocolId: moonwell.id,
      allocation: 20
    }
  });

  // OP/IDRX: 40% Moonwell + 35% Aave + 25% Aerodrome
  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: opIdrx.id,
        protocolId: moonwell.id
      }
    },
    update: {},
    create: {
      strategyId: opIdrx.id,
      protocolId: moonwell.id,
      allocation: 40
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: opIdrx.id,
        protocolId: aave.id
      }
    },
    update: {},
    create: {
      strategyId: opIdrx.id,
      protocolId: aave.id,
      allocation: 35
    }
  });

  await prisma.strategyProtocol.upsert({
    where: {
      strategyId_protocolId: {
        strategyId: opIdrx.id,
        protocolId: aerodrome.id
      }
    },
    update: {},
    create: {
      strategyId: opIdrx.id,
      protocolId: aerodrome.id,
      allocation: 25
    }
  });

  console.log('✅ Strategy allocations created');
  console.log('🎉 Database seeded successfully with IDRX pairs!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
