import { useContext } from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components';
import { NavLink as RouterNavLink } from 'react-router';

type Props = {
  to: string;
  label: string;
};

export function NavLink({ to, label }: Props) {
  const { close } = useContext(OverlayTriggerStateContext)!;
  return (
    <RouterNavLink className='flex items-center w-full h-14 hover:bg-blue-500/10 px-4' onClick={() => close()} to={to}>
      {label}
    </RouterNavLink>
  );
}
