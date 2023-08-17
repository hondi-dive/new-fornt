import { Dialog, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren } from 'react';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlacePicker({
  showModal,
  setShowModal,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed top-0 left-0 w-full h-screen flex justify-center items-center"
        onClose={() => setShowModal(false)}
      >
        <div className="bg-[rgba(0,0,0,0.4)] max-w-[393px] p-6 w-full h-full flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 mt-[10000px]"
            enterTo="opacity-100 scale-100 mt-[0]"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-[rgba(255,255,255,0.8)] rounded-lg p-5 w-full">
              <Dialog.Title className="text-lg mb-5">{'장소선택'}</Dialog.Title>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
