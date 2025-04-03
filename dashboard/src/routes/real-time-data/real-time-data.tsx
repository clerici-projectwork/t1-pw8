import type { TRealTimePageApiResponse, TWeather } from '@clerici/common/types';
import { useEffect, useState } from 'react';
import { PanelGroup } from '../../components/ui/panel-group/panel-group';
import { TodayTag } from '../../components/ui/today-tag/today-tag';
import { TemperaturePanel } from '../../components/ui/panels/temperature-panel/temperature-panel';
import { HumidityPanel } from '../../components/ui/panels/humidity-panel/humidity-panel';
import { PrecipitationPanel } from '../../components/ui/panels/precipitation-panel/precipitation-panel';
import { type PieChartData, PieChartPanel } from '../../components/ui/panels/pie-chart-panel/pie-chart-panel';
import { CurrencyEur, Factory } from '@phosphor-icons/react';
import { COLORS } from '../../common/constants';
import { getRandomFloat, truncateToTwoDecimals } from '../../common/utils';

const pieChartsColors: string[] = [COLORS.GOLD, COLORS.SILVER, COLORS.COPPER];

export function RealTimeDataRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [weather, setWeather] = useState<TWeather | undefined>(undefined);
  const [metalExtracted, setMetalExtracted] = useState<PieChartData[]>([]);
  const [moneyEarnt, setMoneyEarnt] = useState<PieChartData[]>([]);

  function getMoneyEarntPanelTile() {
    const totalEarnt = moneyEarnt.reduce((prev, curr) => prev + curr.value, 0);
    return `Euro guadagnati oggi - ${truncateToTwoDecimals(totalEarnt)}€`;
  }

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const result = await fetch('http://localhost:3000/api/page/real-time');
        const json = (await result.json()) as TRealTimePageApiResponse;

        if (json.ok !== true) {
          throw new Error();
        }

        const goldExtracted = getRandomFloat(89, 791);
        const silverExtracted = getRandomFloat(4391, 5811);
        const copperExtracted = getRandomFloat(6911, 8611);

        setMetalExtracted([
          { id: 0, label: 'Oro', value: goldExtracted },
          { id: 1, label: 'Argento', value: silverExtracted },
          { id: 2, label: 'Rame', value: copperExtracted }
        ]);
        setMoneyEarnt([
          {
            id: 0,
            label: 'Da oro',
            value: truncateToTwoDecimals(goldExtracted * json.data.metalMarketValues.gold)!
          },
          {
            id: 1,
            label: 'Da argento',
            value: truncateToTwoDecimals(silverExtracted * json.data.metalMarketValues.silver)!
          },
          {
            id: 2,
            label: 'Da rame',
            value: truncateToTwoDecimals(copperExtracted * json.data.metalMarketValues.copper)!
          }
        ]);
        setWeather(json.data.locationWeather);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    asyncFunc();
  }, []);

  return (
    <div className='w-full'>
      <PanelGroup title="Dati Real-Time d'ambiente" trailingSlot={<TodayTag />}>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
          <TemperaturePanel value={weather?.temperature} isLoading={isLoading} hasError={hasError} />
          <HumidityPanel value={weather?.humidity} isLoading={isLoading} hasError={hasError} />
          <PrecipitationPanel value={weather?.precipitation} isLoading={isLoading} hasError={hasError} />
        </div>
      </PanelGroup>
      <PanelGroup className='mt-20' title='Dati Real-Time di produzione' trailingSlot={<TodayTag />}>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
          <PieChartPanel
            colors={pieChartsColors}
            hasError={hasError}
            isLoading={isLoading}
            headerIcon={Factory}
            header='Metalli estratti oggi'
            data={metalExtracted}
          />
          <PieChartPanel
            colors={pieChartsColors}
            hasError={hasError}
            isLoading={isLoading}
            headerIcon={CurrencyEur}
            header={getMoneyEarntPanelTile()}
            data={moneyEarnt}
          />
        </div>
      </PanelGroup>
    </div>
  );
}
