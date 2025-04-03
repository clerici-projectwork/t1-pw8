import { format } from 'date-fns';

export function TodayTag() {
  return (
    <div className='bg-white px-4 py-2 shadow'>
      <p className='text-sm font-light whitespace-nowrap'>{format(new Date(), 'd MMM yyyy - HH:mm')}</p>
    </div>
  );
}
