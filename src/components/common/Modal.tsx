import { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface MyModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  panelClassName: string;
  titleClassName: string;
  title: string;
  children: ReactNode;
}

export default function Modal({
  showModal,
  setShowModal,
  panelClassName,
  titleClassName,
  title,
  children,
}: MyModalProps) {
  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowModal(false)}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center pt-[60%] justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 mt-[10000px]"
                enterTo="opacity-100 scale-100 mt-[0]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={panelClassName}>
                  <Dialog.Title className={titleClassName}>{title}</Dialog.Title>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
