import React from "react";
import { InputText } from "../../FormComponents/InputText";
import { InputCheckbox } from "../../FormComponents/Checkbox";
import { Button } from "@mui/material";
import ModalComponent from "../../Modal/ModalComponent";
import "../Users.scss";
import { useUserUpdateModal } from "../hooks/useUserUpdateModal";

type Props = {
  data?: any;
};

export function UserUpdateModal({ data }: Props) {
  const {
    methods: { control, errors },
    onSubmit,
    setIsAdmin,
  } = useUserUpdateModal(data);

  return (
    <ModalComponent>
      <div className="add-modal">
        <form onSubmit={onSubmit} className="add-form">
          <div className="add-form-inner">
            <div className="add-form-left">
              <div className="add-form-right-username">
                <InputText
                  status={true}
                  name="username"
                  label="Username"
                  control={control}
                />
                <InputCheckbox
                  name="isAdmin"
                  control={control}
                  label="Is admin"
                  onChange={setIsAdmin}
                />
              </div>
              <InputText
                status={true}
                name="first_name"
                label="First name"
                control={control}
              />
              <InputText
                status={true}
                name="last_name"
                label="Last name"
                control={control}
              />
              <InputText
                status={true}
                name="user_image"
                label="User image"
                control={control}
              />
            </div>
          </div>

          <Button type="submit" variant="contained">
            Change
          </Button>
        </form>
      </div>
    </ModalComponent>
  );
}
