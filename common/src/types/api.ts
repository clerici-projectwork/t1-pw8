import type {
  TCo2ProductionByMetalByMonth,
  TMetalMarketValues,
  TMetalProductionByMonth,
  TMetalRevenueByMonth,
  TProductionCostByMetalByMonth,
  TWeather
} from './model';

type TApiResponse<T> = { ok: true; data: T } | { ok: false; data: null };

export type TKpiPageApiValue = {
  metalValuePerGram: TMetalMarketValues;
  metalsRevenue: TMetalRevenueByMonth;
};

export type TKpiPageApiResponse = TApiResponse<TKpiPageApiValue>;

export type THistoricalPageApiValue = {
  metalsProduced: TMetalProductionByMonth;
  co2Produced: TCo2ProductionByMetalByMonth;
  metalsProductionCost: TProductionCostByMetalByMonth;
};

export type THistoricalPageApiResponse = TApiResponse<THistoricalPageApiValue>;

export type TRealTimePageApiValue = {
  locationWeather: TWeather;
  metalMarketValues: TMetalMarketValues;
};

export type TRealTimePageApiResponse = TApiResponse<TRealTimePageApiValue>;
