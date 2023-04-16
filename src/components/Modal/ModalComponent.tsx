import * as React from "react";
import Modal from "react-modal";

type ModalProps = {
  isOpen: boolean,
  children: any,
  className: string,
  overlayClassName: string
}

export default function ModalComponent({ isOpen, children, className, overlayClassName }: ModalProps) {

  return (
    <Modal
      isOpen={isOpen}
      className={className}
      overlayClassName={overlayClassName}
    >
      {children}
    </Modal>
  );
}