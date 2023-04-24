import * as React from "react";
import Modal from "react-modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./Modal.scss";
import { change } from "../../store/reducers/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

type ModalProps = {
  children: any;
};

export default function ModalComponent({ children }: ModalProps) {
  const isOpen = useAppSelector((state) => state.modalReducer);
  const dispatch = useAppDispatch();

  return (
    <Modal
      isOpen={isOpen}
      className="modal-content"
      overlayClassName="modal-back"
    >
      <div className="modal-top">
        <IconButton className="modal-close" onClick={() => dispatch(change())}>
          <CloseIcon />
        </IconButton>
      </div>
      {children}
    </Modal>
  );
}
