export interface ProtocolData {
  name: string;
  apy: number;
  tvl: number;
}

export interface StrategyData {
  name: string;
  displayName: string;
  apyMin: number;
  apyMax: number;
  apyCurrent: number;
  riskLevel: string;
  lockPeriod: number;
  protocols: {
    name: string;
    allocation: number;
    apy: number;
  }[];
}

export interface BlockchainConfig {
  rpcUrl: string;
  chainId: number;
}

export type StrategyName = 'conservative' | 'balanced' | 'growth';

export type ProtocolName = 'moonwell' | 'aave' | 'aerodrome' | 'seamless';
