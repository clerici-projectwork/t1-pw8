import type { TKpiPageApiResponse, TKpiPageApiValue } from '@clerici/common/types';
import { useEffect, useState } from 'react';
import { PanelGroup } from '../../components/ui/panel-group/panel-group';
import { TodayTag } from '../../components/ui/today-tag/today-tag';
import { MetalMarketValuePanel } from '../../components/ui/panels/metal-market-value-panel/metal-market-value-panel';
import { Panel } from '../../components/ui/panels/base-panel/base-panel';
import { BarChart } from '@mui/x-charts';
import { ChartLineUp } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { COLORS } from '../../common/constants';

export function KpiDataRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [pageData, setPageData] = useState<TKpiPageApiValue | null>(null);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const result = await fetch('http://localhost:3000/api/page/kpi');
        const json = (await result.json()) as TKpiPageApiResponse;

        if (json.ok !== true) {
          throw new Error();
        }

        setPageData(json.data);
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
      <PanelGroup title='Dati Valore Metalli' trailingSlot={<TodayTag />}>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
          <MetalMarketValuePanel
            metal='gold'
            value={pageData?.metalValuePerGram.gold}
            isLoading={isLoading}
            hasError={hasError}
            header='Valore Oro (€/g)'
          />
          <MetalMarketValuePanel
            metal='silver'
            value={pageData?.metalValuePerGram.silver}
            isLoading={isLoading}
            hasError={hasError}
            header='Valore Argento (€/g)'
          />
          <MetalMarketValuePanel
            metal='copper'
            value={pageData?.metalValuePerGram.copper}
            isLoading={isLoading}
            hasError={hasError}
            header='Valore Rame (€/g)'
          />
        </div>
      </PanelGroup>
      <PanelGroup className='mt-20' title='Guadagni ultimi 3 mesi'>
        <div className='w-full grid grid-cols-1 gap-8'>
          <Panel
            height='md'
            className='w-full'
            hasError={hasError}
            isLoading={isLoading}
            headerIcon={ChartLineUp}
            header='Guadagni per metallo (€/g)'
          >
            <BarChart
              xAxis={[
                {
                  scaleType: 'band',
                  data: pageData?.metalsRevenue.months.map(x => format(x, 'LLLL yy', { locale: it }))
                }
              ]}
              yAxis={[
                {
                  scaleType: 'sqrt'
                }
              ]}
              series={[
                {
                  data: pageData?.metalsRevenue.gold,
                  label: 'Oro',
                  color: COLORS.GOLD
                },
                {
                  data: pageData?.metalsRevenue.silver,
                  label: 'Argento',
                  color: COLORS.SILVER
                },
                {
                  data: pageData?.metalsRevenue.copper,
                  label: 'Rame',
                  color: COLORS.COPPER
                }
              ]}
            />
          </Panel>
        </div>
      </PanelGroup>
    </div>
  );
}
