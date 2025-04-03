import { Panel, type PanelWithFetchProps } from '../base-panel/base-panel';
import { Gauge } from '@mui/x-charts';
import { CloudRain } from '@phosphor-icons/react';
import { truncateToTwoDecimals } from '../../../../common/utils';

type Props = PanelWithFetchProps & {
  value?: number;
};

export function PrecipitationPanel({ value, isLoading, hasError }: Props) {
  function getPanelHasError() {
    return hasError || (value === undefined && !isLoading);
  }

  return (
    <Panel
      height='sm'
      hasError={getPanelHasError()}
      isLoading={isLoading}
      header='Precipitazioni'
      headerIcon={CloudRain}
    >
      <div className='h-full'>
        <Gauge
          value={truncateToTwoDecimals(value!)}
          startAngle={-110}
          endAngle={110}
          valueMin={0}
          valueMax={5}
          classes={{
            valueText: 'text-6xl -translate-y-[10px] font-extralight',
            valueArc: '!fill-blue-100'
          }}
        />
      </div>
    </Panel>
  );
}
