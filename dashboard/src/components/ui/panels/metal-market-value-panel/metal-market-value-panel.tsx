import { Panel } from '../base-panel/base-panel';
import { CurrencyEur } from '@phosphor-icons/react';
import { tv, type VariantProps } from 'tailwind-variants';

type Props = {
  value?: number;
  isLoading: boolean;
  hasError: boolean;
  header: string;
  metal: NonNullable<VariantProps<typeof circleStyle>['metal']>;
};

export function MetalMarketValuePanel({ header, value, isLoading, hasError, metal }: Props) {
  function getPanelHasError() {
    return hasError || (value === undefined && !isLoading);
  }

  return (
    <Panel height='sm' hasError={getPanelHasError()} isLoading={isLoading} header={header} headerIcon={CurrencyEur}>
      <div className='h-full flex flex-col items-center gap-4'>
        <div className={circleStyle({ metal })} />
        <p className='text-2xl font-light'>{value?.toFixed(4)}€</p>
      </div>
    </Panel>
  );
}

const circleStyle = tv({
  base: 'size-40 aspect-square amax-w-1/2 bg-amber-400 rounded-full',
  variants: {
    metal: {
      gold: 'bg-[#E6C36A]',
      silver: 'bg-[#CFCFCF]',
      copper: 'bg-[#D28A7C]'
    }
  }
});
