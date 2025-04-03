import { existsSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  COPPER_TONS_DAILY_PRODUCTION,
  GOLD_TONS_DAILY_PRODUCTION,
  SILVER_TONS_DAILY_PRODUCTION
} from '@clerici/common/constants';
import type { TMetalProductionGeneratedJson } from '@clerici/common/types';
import { gaussianDistribution } from '@clerici/common/utils';

function generateMetalsProduction() {
  const outputPath = join(__dirname, './../output/generated-metals-production.json');
  const metalsProduction: TMetalProductionGeneratedJson = {
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
    metalsProduction.gold.push(gaussianDistribution(GOLD_TONS_DAILY_PRODUCTION, GOLD_TONS_DAILY_PRODUCTION / 10));
    metalsProduction.silver.push(gaussianDistribution(SILVER_TONS_DAILY_PRODUCTION, SILVER_TONS_DAILY_PRODUCTION / 10));
    metalsProduction.copper.push(gaussianDistribution(COPPER_TONS_DAILY_PRODUCTION, COPPER_TONS_DAILY_PRODUCTION / 10));
  }

  writeFileSync(outputPath, JSON.stringify(metalsProduction, null, 4), 'utf8');
}

generateMetalsProduction();
