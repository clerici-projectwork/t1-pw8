import type { TRealTimePageApiResponse } from '@clerici/common/types';
import express from 'express';
import { getDollarToEuro } from '../utils/get-dollar-to-euro';
import { getMetalsMarketValue } from '../utils/get-metals-market-value';
const router = express.Router();

router.get('/page/real-time', async (_, res) => {
  try {
    const [metalsMarketValue, dollarToEuro, openMeteoFetchResult] = await Promise.all([
      getMetalsMarketValue(),
      getDollarToEuro(),
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${process.env.LOCATION_LATITUDE}&longitude=${process.env.LOCATION_LONGITUDE}&current=temperature_2m,precipitation,relative_humidity_2m`
      )
    ]);

    const openMeteoJsonResult = await openMeteoFetchResult.json();

    if (!metalsMarketValue || !dollarToEuro || !openMeteoJsonResult) {
      res.send({ ok: false, data: null } satisfies TRealTimePageApiResponse);
      return;
    }
    const temperature = openMeteoJsonResult.current.temperature_2m;
    const precipitation = openMeteoJsonResult.current.precipitation;
    const humidity = openMeteoJsonResult.current.relative_humidity_2m;

    const result = {
      ok: true,
      data: { locationWeather: { humidity, precipitation, temperature }, metalMarketValues: metalsMarketValue }
    } satisfies TRealTimePageApiResponse;

    res.send(result);
    return;
  } catch {
    res.send({ ok: false, data: null } satisfies TRealTimePageApiResponse);
  }
});

export default router;
