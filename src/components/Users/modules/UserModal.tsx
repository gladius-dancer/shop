import React from "react";
import { InputText } from "../../FormComponents/InputText";
import { Dropdown } from "../../FormComponents/Dropdown";
import { Button, FormHelperText } from "@mui/material";
import ModalComponent from "../../Modal/ModalComponent";
import { useUserModal } from "../hooks/useUserModal";
import "../Users.scss";

type Props = {
  data?: any;
  country: number[];
};

export function UserModal({ country, data }: Props) {
  const {
    methods: { control, errors },
    onSubmit,
  } = useUserModal(data);

  return (
    <ModalComponent>
      <div className="add-modal">
        <form onSubmit={onSubmit} className="add-form">
          <div className="add-form-inner">
            <div className="add-form-left">
              <InputText
                status={true}
                name="username"
                label="Username"
                control={control}
              />
              <InputText
                status={true}
                name="password"
                label="Password"
                control={control}
              />
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
            <div className="add-form-right">
              <div className="add-form-right-phone">
                <InputText
                  status={true}
                  name="phone_number"
                  label="Phone number"
                  control={control}
                />
                <InputText
                  status={true}
                  name="type"
                  label="Type of number"
                  control={control}
                />
              </div>
              <InputText
                status={true}
                name="street_address"
                label="Street"
                control={control}
              />
              <InputText
                status={true}
                name="postal_code"
                label="Postal code"
                control={control}
              />
              <InputText
                status={true}
                name="city"
                label="City"
                control={control}
              />
              <Dropdown
                key="country"
                name="country_id"
                control={control}
                options={country}
              />
              {errors.country && (
                <FormHelperText error>
                  {errors.country_id.message}
                </FormHelperText>
              )}
            </div>
          </div>

          <Button type="submit" variant="contained">
            Add
          </Button>
        </form>
      </div>
    </ModalComponent>
  );
}
