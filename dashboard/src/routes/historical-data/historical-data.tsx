import type {
  TCo2ProductionByMetalByMonth,
  TMetalProductionByMonth,
  THistoricalPageApiResponse,
  TProductionCostByMetalByMonth
} from '@clerici/common/types';
import { useEffect, useState } from 'react';
import { PanelGroup } from '../../components/ui/panel-group/panel-group';
import { TodayTag } from '../../components/ui/today-tag/today-tag';
import { Biohazard, ChartBar, Invoice } from '@phosphor-icons/react';
import { BarChart, LineChart } from '@mui/x-charts';
import { COLORS } from '../../common/constants';
import { Panel } from '../../components/ui/panels/base-panel/base-panel';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

export function HistoricalDataRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [metalProducedByMonth, setMetalProducedByMonth] = useState<TMetalProductionByMonth | null>(null);
  const [co2ProducedByMonth, setCo2ProducedByMonth] = useState<TCo2ProductionByMetalByMonth | null>(null);
  const [metalProductionCostByMonth, setMetalProductionCostByMonth] = useState<TProductionCostByMetalByMonth | null>(
    null
  );
  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const result = await fetch('http://localhost:3000/api/page/historical');
        const json = (await result.json()) as THistoricalPageApiResponse;

        if (json.ok !== true) {
          throw new Error();
        }

        setMetalProducedByMonth(json.data.metalsProduced);
        setCo2ProducedByMonth(json.data.co2Produced);
        setMetalProductionCostByMonth(json.data.metalsProductionCost);
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
      <PanelGroup title='Dati Storici annuali' trailingSlot={<TodayTag />}>
        <div className='w-full grid grid-cols-1'>
          <Panel
            height='md'
            className='w-full'
            hasError={hasError}
            isLoading={isLoading}
            headerIcon={ChartBar}
            header='Tonnellate estratte per metallo'
          >
            {metalProducedByMonth && (
              <LineChart
                series={[
                  {
                    data: metalProducedByMonth?.copper,
                    label: 'Rame',
                    area: true,
                    stack: 'total',
                    showMark: false,
                    color: COLORS.COPPER
                  },
                  {
                    data: metalProducedByMonth?.silver,
                    label: 'Argento',
                    area: true,
                    stack: 'total',
                    showMark: false,
                    color: COLORS.SILVER
                  },
                  {
                    data: metalProducedByMonth?.gold,
                    label: 'Oro',
                    area: true,
                    stack: 'total',
                    showMark: false,
                    color: COLORS.GOLD
                  }
                ]}
                xAxis={[
                  {
                    scaleType: 'band',
                    data: metalProducedByMonth?.months.map(x => format(x, 'LLLL yy', { locale: it }))
                  }
                ]}
              />
            )}
          </Panel>
        </div>
      </PanelGroup>
      <PanelGroup className='mt-20' title='Dati Storici Ultimo Trimestre'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Panel
            height='md'
            className='w-full'
            hasError={hasError}
            isLoading={isLoading}
            headerIcon={Biohazard}
            header='Guadagni per metallo (€/g)'
          >
            {co2ProducedByMonth && (
              <BarChart
                skipAnimation={true}
                colors={[COLORS.GOLD, COLORS.SILVER, COLORS.COPPER]}
                xAxis={[
                  { scaleType: 'band', data: co2ProducedByMonth?.months.map(x => format(x, 'LLLL yy', { locale: it })) }
                ]}
                yAxis={[{ scaleType: 'sqrt' }]}
                margin={{ left: 55 }}
                series={[
                  {
                    data: co2ProducedByMonth?.gold,
                    label: 'Oro',
                    color: COLORS.GOLD
                  },
                  {
                    data: co2ProducedByMonth?.silver,
                    label: 'Argento',
                    color: COLORS.SILVER
                  },
                  {
                    data: co2ProducedByMonth?.copper,
                    label: 'Rame',
                    color: COLORS.COPPER
                  }
                ]}
              />
            )}
          </Panel>

          <Panel
            height='md'
            className='w-full'
            hasError={hasError}
            isLoading={isLoading}
            headerIcon={Invoice}
            header='Costi estrazioni'
          >
            {metalProductionCostByMonth && (
              <BarChart
                skipAnimation={false}
                colors={[COLORS.GOLD, COLORS.SILVER, COLORS.COPPER]}
                xAxis={[
                  {
                    scaleType: 'band',
                    data: metalProductionCostByMonth?.months.map(x => format(x, 'LLLL yy', { locale: it }))
                  }
                ]}
                yAxis={[{ scaleType: 'sqrt' }]}
                margin={{ left: 80 }}
                series={[
                  {
                    data: metalProductionCostByMonth?.gold,
                    label: 'Oro',
                    color: COLORS.GOLD
                  },
                  {
                    data: metalProductionCostByMonth?.silver,
                    label: 'Argento',
                    color: COLORS.SILVER
                  },
                  {
                    data: metalProductionCostByMonth?.copper,
                    label: 'Rame',
                    color: COLORS.COPPER
                  }
                ]}
              />
            )}
          </Panel>
        </div>
      </PanelGroup>
    </div>
  );
}
