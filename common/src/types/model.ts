export type TMetalMarketValues = {
  gold: number;
  silver: number;
  copper: number;
};

export type TMetalRevenueByMonth = {
  months: Date[];
  gold: number[];
  silver: number[];
  copper: number[];
};

export type TMetalProductionByMonth = {
  months: Date[];
  gold: number[];
  silver: number[];
  copper: number[];
};

export type TCo2ProductionByMetalByMonth = {
  months: Date[];
  gold: number[];
  silver: number[];
  copper: number[];
};

export type TProductionCostByMetalByMonth = {
  months: Date[];
  gold: number[];
  silver: number[];
  copper: number[];
};

export type TWeather = {
  temperature: number;
  precipitation: number;
  humidity: number;
};
