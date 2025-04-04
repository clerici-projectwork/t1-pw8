import { existsSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  CO2_TONS_PRODUCTION_PER_COPPER_TON,
  CO2_TONS_PRODUCTION_PER_GOLD_TON,
  CO2_TONS_PRODUCTION_PER_SILVER_TON,
  COPPER_TONS_DAILY_PRODUCTION,
  GOLD_TONS_DAILY_PRODUCTION,
  SILVER_TONS_DAILY_PRODUCTION
} from '@clerici/common/constants';
import type { TCo2ProductionByMetalGeneratedJson } from '@clerici/common/types';
import { gaussianDistribution } from '@clerici/common/utils';

function generateCO2Production() {
  const outputPath = join(__dirname, './../output/generated-co2-production.json');
  const co2Production: TCo2ProductionByMetalGeneratedJson = {
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
    co2Production.gold.push(
      gaussianDistribution(CO2_TONS_PRODUCTION_PER_GOLD_TON, CO2_TONS_PRODUCTION_PER_GOLD_TON / 10) *
      gaussianDistribution(GOLD_TONS_DAILY_PRODUCTION, GOLD_TONS_DAILY_PRODUCTION / 10)
    );
    co2Production.silver.push(
      gaussianDistribution(CO2_TONS_PRODUCTION_PER_SILVER_TON, CO2_TONS_PRODUCTION_PER_SILVER_TON / 10) *
      gaussianDistribution(SILVER_TONS_DAILY_PRODUCTION, SILVER_TONS_DAILY_PRODUCTION / 10)
    );
    co2Production.copper.push(
      gaussianDistribution(CO2_TONS_PRODUCTION_PER_COPPER_TON, CO2_TONS_PRODUCTION_PER_COPPER_TON / 10)*
      gaussianDistribution(COPPER_TONS_DAILY_PRODUCTION, COPPER_TONS_DAILY_PRODUCTION / 10)
    );
  }

  writeFileSync(outputPath, JSON.stringify(co2Production, null, 4), 'utf8');
}

generateCO2Production();
