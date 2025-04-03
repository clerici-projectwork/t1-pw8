import type { TKpiPageApiResponse, TMetalRevenueByMonth } from '@clerici/common/types';
import express from 'express';
import { getMetalsMarketValue } from '../utils/get-metals-market-value';
import { subMonths } from 'date-fns';
import metalsProduced from '../db/generated-metals-production.json';
import {
  COPPER_GR_PRODUCTION_COST,
  GOLD_GR_PRODUCTION_COST,
  SILVER_GR_PRODUCTION_COST
} from '@clerici/common/constants';

const router = express.Router();

router.get('/page/kpi', async (_, res) => {
  const now = new Date();
  const metalsMarketValue = await getMetalsMarketValue();

  if (!metalsMarketValue) {
    res.send({ ok: false, data: null } satisfies TKpiPageApiResponse);
    return;
  }
  const metalsRevenueByMonth: TMetalRevenueByMonth = {
    copper: [],
    gold: [],
    months: [],
    silver: []
  };

  // taking the last 90 days and spread them across the last 3 month, including the current
  for (let i = 0; i < 3; i++) {
    // using unshift, we order dates this way (today - 2 months, today - 1 month, today)
    // then, on frontend we'll just take the month from that date
    metalsRevenueByMonth.months.unshift(subMonths(now, i));

    // For co2 production and cost production, we are simplifying,
    // considering 30 days in each month, including the current one
    metalsRevenueByMonth.gold.unshift(
      metalsProduced.gold
        .slice(30 * i, 30 * (i + 1))
        .reduce((prev, curr) => prev + (metalsMarketValue.gold - GOLD_GR_PRODUCTION_COST) * curr, 0)
    );
    metalsRevenueByMonth.silver.unshift(
      metalsProduced.silver
        .slice(30 * i, 30 * (i + 1))
        .reduce((prev, curr) => prev + (metalsMarketValue.silver - SILVER_GR_PRODUCTION_COST) * curr, 0)
    );
    metalsRevenueByMonth.copper.unshift(
      metalsProduced.copper
        .slice(30 * i, 30 * (i + 1))
        .reduce((prev, curr) => prev + (metalsMarketValue.copper - COPPER_GR_PRODUCTION_COST) * curr, 0)
    );
  }

  res.send({
    ok: true,
    data: { metalsRevenue: metalsRevenueByMonth, metalValuePerGram: metalsMarketValue }
  } satisfies TKpiPageApiResponse);
});

export default router;
