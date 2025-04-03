import type { PropsWithChildren, ReactNode } from 'react';

type Props = {
  title: string;
  trailingSlot?: ReactNode;
  className?: string;
};

export function PanelGroup({ title, className, trailingSlot, children }: PropsWithChildren<Props>) {
  return (
    <div className={className}>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl'>{title}</h2>
        {trailingSlot && <div>{trailingSlot}</div>}
      </div>
      <div className='mt-10'>{children}</div>
    </div>
  );
}
