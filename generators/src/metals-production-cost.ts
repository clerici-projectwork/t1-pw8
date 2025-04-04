import { existsSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  COPPER_GR_PRODUCTION_COST,
  COST_COPPER_EXTRACTION_PER_TON,
  COST_GOLD_EXTRACTION_PER_TON,
  COST_SILVER_EXTRACTION_PER_TON,
  GOLD_TONS_DAILY_PRODUCTION,
  SILVER_TONS_DAILY_PRODUCTION
} from '@clerici/common/constants';
import type { TMetalProductionCostGeneratedJson } from '@clerici/common/types';
import { gaussianDistribution } from '@clerici/common/utils';

function generateMetalsProductionCost() {
  const outputPath = join(__dirname, './../output/generated-metals-production-cost.json');
  const metalsProductionCost: TMetalProductionCostGeneratedJson = {
    gold: [],
    silver: [],
    copper: []
  };

  if (existsSync(outputPath)) {
    unlinkSync(outputPath);
  }

  // Generating data for 365 days: one of the dashboard graph show the effiency for the last 12 months
  // thus we need these amount of data
  for (let i = 0; i < 365; i++) {
    metalsProductionCost.gold.push(
      gaussianDistribution(COST_GOLD_EXTRACTION_PER_TON, COST_GOLD_EXTRACTION_PER_TON / 10)*
            gaussianDistribution(GOLD_TONS_DAILY_PRODUCTION, GOLD_TONS_DAILY_PRODUCTION / 10)
    );
    metalsProductionCost.silver.push(
      gaussianDistribution(COST_SILVER_EXTRACTION_PER_TON, COST_SILVER_EXTRACTION_PER_TON / 10)*
      gaussianDistribution(SILVER_TONS_DAILY_PRODUCTION, SILVER_TONS_DAILY_PRODUCTION / 10)
    );
    metalsProductionCost.copper.push(
      gaussianDistribution(COST_COPPER_EXTRACTION_PER_TON, COST_COPPER_EXTRACTION_PER_TON / 10)*
      gaussianDistribution(COPPER_GR_PRODUCTION_COST, COPPER_GR_PRODUCTION_COST / 10)
    );
  }

  writeFileSync(outputPath, JSON.stringify(metalsProductionCost, null, 4), 'utf8');
}

generateMetalsProductionCost();
