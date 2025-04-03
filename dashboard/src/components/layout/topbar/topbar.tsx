import { UserCircle, Bell } from '@phosphor-icons/react';
import { ModalHamburgerMenu } from '../../ui/modal-hamburger-menu/modal-hamburger-menu';
import { Logo } from '../../ui/logo/logo';

export function Topbar() {
  return (
    <header className='w-full shadow h-20 flex items-center z-10 sticky top-0 px-4 md:px-10 bg-white'>
      <ModalHamburgerMenu />

      <Logo />

      <div className='flex items-center ml-auto min-w-0'>
        <Bell className='size-4 shrink-0 mx-4 sm:size-6' weight='thin' />
        <div className='flex items-center min-w-0'>
          <UserCircle className='size-8 shrink-0 sm:size-10 mr-2' weight='thin' />
          <div className='flex flex-col justify-center min-w-0'>
            <p className='leading-5 text-lg text-ellipsis overflow-hidden whitespace-nowrap'>Giulia Clerici</p>
            <p className='text-gray-500 text-xs text-ellipsis overflow-hidden whitespace-nowrap'>Cave Expert</p>
          </div>
        </div>
      </div>
    </header>
  );
}
