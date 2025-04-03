import { differenceInDays } from 'date-fns';

let cachedValue: number | null = null;
let cachedValueTimeStamp: Date | null = null;

export async function getDollarToEuro(): Promise<number> {
  const now = new Date();

  // This way, we cached the value for 24 hours, due to API rate limitations
  if (cachedValue && cachedValueTimeStamp && differenceInDays(now, cachedValueTimeStamp) < 1) {
    return cachedValue;
  }

  try {
    const headers = new Headers([['apiKey', process.env.FREE_CURRENCY_API_KEY!]]);
    const usdToEurFetchResult = await fetch(
      'https://api.freecurrencyapi.com/v1/latest?base_currency=USD&currencies=EUR',
      { headers }
    );
    const jsonResult = await usdToEurFetchResult.json();

    if (typeof jsonResult.data.EUR !== 'number') {
      throw new Error('cannot retrieve USD/EUR rate. Return default value of 1.');
    }

    cachedValue = jsonResult.data.EUR;
    cachedValueTimeStamp = now;

    return jsonResult.data.EUR;
  } catch (error) {
    console.error(error);
    return 1;
  }
}
