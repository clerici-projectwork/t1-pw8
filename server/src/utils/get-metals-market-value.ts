import { AVOIRDUPOIS_OAUNCE_TO_GRAM, TROY_OUNCE_TO_GRAM } from '@clerici/common/constants';
import type { TMetalMarketValues } from '@clerici/common/types';
import { differenceInDays } from 'date-fns';
import { getDollarToEuro } from './get-dollar-to-euro';

let cachedValue: TMetalMarketValues | null = null;
let cachedValueTimeStamp: Date | null = null;

export async function getMetalsMarketValue(): Promise<TMetalMarketValues | null> {
  const now = new Date();

  // This way, we cached the value for 24 hours to prevent API overuse
  if (cachedValue && cachedValueTimeStamp && differenceInDays(now, cachedValueTimeStamp) < 1) {
    return cachedValue;
  }

  try {
    // Use Promise.all to perform all three API calls at the same time
    const [goldFetchResult, silverFetchResult, copperFetchResult] = await Promise.all([
      fetch('https://api.gold-api.com/price/XAU'),
      fetch('https://api.gold-api.com/price/XAG'),
      fetch('https://api.gold-api.com/price/HG')
    ]);

    // Use Promise.all to perform all three API calls at the same time
    const [goldJsonResult, silverjsonResult, copperJsonResult] = await Promise.all([
      goldFetchResult.json(),
      silverFetchResult.json(),
      copperFetchResult.json()
    ]);

    const dollarToEuro = await getDollarToEuro();

    cachedValueTimeStamp = now;
    cachedValue = {
      gold: (goldJsonResult.price / TROY_OUNCE_TO_GRAM) * dollarToEuro,
      silver: (silverjsonResult.price / TROY_OUNCE_TO_GRAM) * dollarToEuro,
      copper: (copperJsonResult.price / AVOIRDUPOIS_OAUNCE_TO_GRAM) * dollarToEuro
    };

    return cachedValue;
  } catch (error) {
    return null;
  }
}
