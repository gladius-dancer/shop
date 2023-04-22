import * as React from "react";
import Modal from "react-modal";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./Modal.scss";
import { change } from "../../store/reducers/ModalSlice";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

type ModalProps = {
  children: any;
};

export default function ModalComponent({ children }: ModalProps) {
  const isOpen = useAppSelector((state) => state.modalReducer);
  const dispatch = useAppDispatch();

  return (
    <div className={cn("modal-back", isOpen ? "opened" : "")}>
      <div className="modal-content">
        <div className="modal-top">
          <IconButton
            className="modal-close"
            onClick={() => dispatch(change())}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}
