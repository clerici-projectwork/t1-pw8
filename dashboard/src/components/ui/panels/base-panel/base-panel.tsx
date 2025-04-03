import type { Icon } from '@phosphor-icons/react';
import type { PropsWithChildren } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { BeatLoader } from 'react-spinners';

export type PanelWithFetchProps = {
  isLoading?: boolean;
  hasError?: boolean;
};

export type PanelProps = VariantProps<typeof panelStyle> &
  PanelWithFetchProps & {
    header: string;
    headerIcon?: Icon;
    className?: string;
  };

export function Panel({
  header,
  headerIcon: HeaderIcon,
  height = 'sm',
  children,
  className,
  isLoading,
  hasError
}: PropsWithChildren<PanelProps>) {
  return (
    <div className={panelStyle({ height, className })}>
      <div className='flex justify-between items-center'>
        <h2 className='font-medium text-xl'>{header}</h2>
        {HeaderIcon && <HeaderIcon className='size-6' />}
      </div>
      <div className='mt-4 max-h-[unset] min-h-0'>
        {isLoading && !hasError && (
          <div className='h-full flex items-center justify-center'>
            <BeatLoader color='#2b7fffA0' speedMultiplier={0.5} />
          </div>
        )}
        {hasError && <div className='h-full flex items-center justify-center'>Error</div>}
        {!isLoading && !hasError && children}
      </div>
    </div>
  );
}

const panelStyle = tv({
  base: 'bg-white shadow rounded-md p-10 grid grid-rows-[auto_1fr] overflow-hidden',
  variants: {
    height: {
      sm: 'h-80',
      md: 'h-[30rem]'
    }
  }
});
