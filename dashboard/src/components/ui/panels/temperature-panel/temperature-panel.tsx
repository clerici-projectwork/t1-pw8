import { Panel, type PanelWithFetchProps } from '../base-panel/base-panel';
import { Gauge } from '@mui/x-charts';
import { ThermometerSimple } from '@phosphor-icons/react';
import { truncateToTwoDecimals } from '../../../../common/utils';

type Props = PanelWithFetchProps & {
  value?: number;
};

export function TemperaturePanel({ value, isLoading, hasError }: Props) {
  function getPanelHasError() {
    return hasError || (value === undefined && !isLoading);
  }

  return (
    <Panel
      height='sm'
      hasError={getPanelHasError()}
      isLoading={isLoading}
      header='Temperatura'
      headerIcon={ThermometerSimple}
    >
      <div className='h-full'>
        <Gauge
          value={truncateToTwoDecimals(value!)}
          startAngle={-110}
          endAngle={110}
          valueMin={-10}
          valueMax={40}
          classes={{
            valueText: 'text-6xl -translate-y-[10px] font-extralight',
            valueArc: '!fill-amber-200'
          }}
        />
      </div>
    </Panel>
  );
}
