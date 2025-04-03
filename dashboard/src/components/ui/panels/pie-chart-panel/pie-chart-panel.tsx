import type { Icon } from '@phosphor-icons/react';
import { Panel, type PanelWithFetchProps } from '../base-panel/base-panel';
import { PieChart } from '@mui/x-charts';

export type PieChartData = {
  id: number;
  value: number;
  label: string;
};

type Props = PanelWithFetchProps & {
  headerIcon: Icon;
  className?: string;
  header: string;
  data: PieChartData[];
  colors?: string[];
};

export function PieChartPanel({ isLoading, colors, hasError, header, headerIcon, className, data }: Props) {
  function getPanelHasError() {
    return hasError || (data === undefined && !isLoading);
  }

  return (
    <Panel
      hasError={getPanelHasError()}
      isLoading={isLoading}
      header={header}
      height='md'
      headerIcon={headerIcon}
      className={className}
    >
      <div className='w-full h-full'>
        <PieChart
          colors={colors}
          margin={{ bottom: 50, right: 20 }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' }
            }
          }}
          series={[{ data }]}
        />
      </div>
    </Panel>
  );
}
