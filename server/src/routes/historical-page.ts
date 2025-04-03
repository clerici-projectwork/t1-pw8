import type {
  TCo2ProductionByMetalByMonth,
  THistoricalPageApiResponse,
  TMetalProductionByMonth,
  TProductionCostByMetalByMonth
} from '@clerici/common/types';
import { subMonths } from 'date-fns';
import express from 'express';
import co2Produced from '../db/generated-co2-production.json';
import metalsProductionCost from '../db/generated-metals-production-cost.json';
import metalsProduced from '../db/generated-metals-production.json';

const router = express.Router();

router.get('/page/historical', async (_, res) => {
  const now = new Date();
  const metalProducedByMonth: TMetalProductionByMonth = {
    months: [],
    gold: [],
    copper: [],
    silver: []
  };
  const co2ProducedByMetalByMonth: TCo2ProductionByMetalByMonth = {
    months: [],
    gold: [],
    copper: [],
    silver: []
  };
  const productionCostByMetalByMonth: TProductionCostByMetalByMonth = {
    months: [],
    gold: [],
    copper: [],
    silver: []
  };

  // taking the 365 records and spread them across the last 12 months
  // for metal production
  for (let i = 0; i < 12; i++) {
    // using unshift, we order dates this way (..., today - 2 months, today - 1 month, today)
    // then, on frontend we'll just take the month from that date
    metalProducedByMonth.months.unshift(subMonths(now, i));

    // For metal production we are simplifying, considering 30 days in each month, including the current one
    metalProducedByMonth.gold.unshift(
      metalsProduced.gold.slice(30 * i, 30 * (i + 1)).reduce((prev, curr) => prev + curr, 0)
    );
    metalProducedByMonth.silver.unshift(
      metalsProduced.silver.slice(30 * i, 30 * (i + 1)).reduce((prev, curr) => prev + curr, 0)
    );
    metalProducedByMonth.copper.unshift(
      metalsProduced.copper.slice(30 * i, 30 * (i + 1)).reduce((prev, curr) => prev + curr, 0)
    );
  }

  // taking the last 90 days and spread them across the last 3 month, including the current
  // for metal production cost and co2 production
  for (let i = 0; i < 3; i++) {
    // using unshift, we order dates this way (today - 2 months, today - 1 month, today)
    // then, on frontend we'll just take the month from that date
    const month = subMonths(now, i);
    co2ProducedByMetalByMonth.months.unshift(month);
    productionCostByMetalByMonth.months.unshift(month);

    // For co2 production and cost production, we are simplifying,
    // considering 30 days in each month, including the current one
    co2ProducedByMetalByMonth.gold.unshift(
      co2Produced.gold.slice(30 * i, 30 * (i + 1)).reduce((prev, curr) => prev + curr, 0)
    );
    co2ProducedByMetalByMonth.silver.unshift(
      co2Produced.silver.slice(30 * i, 30 * (i + 1)).reduce((prev, curr) => prev + curr, 0)
    );
    co2ProducedByMetalByMonth.copper.unshift(
      co2Produced.copper.slice(30 * i, 30 * (i + 1)).reduce((prev, curr) => prev + curr, 0)
    );

    productionCostByMetalByMonth.gold.unshift(
      metalsProductionCost.gold.slice(30 * i, 30 * (i + 1)).reduce((prev, curr) => prev + curr, 0)
    );
    productionCostByMetalByMonth.silver.unshift(
      metalsProductionCost.silver.slice(30 * i, 30 * (i + 1)).reduce((prev, curr) => prev + curr, 0)
    );
    productionCostByMetalByMonth.copper.unshift(
      metalsProductionCost.copper.slice(30 * i, 30 * (i + 1)).reduce((prev, curr) => prev + curr, 0)
    );
  }

  const result = {
    ok: true,
    data: {
      co2Produced: co2ProducedByMetalByMonth,
      metalsProduced: metalProducedByMonth,
      metalsProductionCost: productionCostByMetalByMonth
    }
  } satisfies THistoricalPageApiResponse;

  res.send(result);
  return;
});

export default router;
