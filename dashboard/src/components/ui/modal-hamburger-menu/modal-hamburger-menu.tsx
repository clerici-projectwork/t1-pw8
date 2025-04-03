import { DialogTrigger, Button, Modal, Dialog, ModalOverlay } from 'react-aria-components';
import { NavLink } from './components/nav-llink';
import { List, X } from '@phosphor-icons/react';
import { Logo } from '../logo/logo';
import { ROUTES } from '../../../common/constants';

export function ModalHamburgerMenu() {
  return (
    <DialogTrigger>
      <Button className='outline-none hover:cursor-pointer'>
        <List className='size-8 shrink-0 mr-4 md:size-10 md:mr-10' weight='thin' />
      </Button>
      <ModalOverlay className='fixed inset-0 bg-black/15 backdrop-blur-sm z-50' isDismissable={true}>
        <Modal className='fixed top-0 bottom-0 left-0 w-80 bg-white outline-none'>
          <Dialog className='outline-none'>
            {({ close }) => (
              <>
                <div className='px-4 flex items-center justify-center h-20 shadow'>
                  <Logo />
                  <X className='size-6 ml-8 hover:cursor-pointer' onClick={() => close()} />
                </div>

                <nav className='flex flex-col'>
                  <NavLink to={ROUTES.REAL_TIME_DATA} label='Real-Time Data' />
                  <NavLink to={ROUTES.HISTORICAL_DATA} label='Dati Storici' />
                  <NavLink to={ROUTES.KPI_DATA} label='Dati KPI' />
                </nav>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
