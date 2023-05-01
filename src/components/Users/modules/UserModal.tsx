import React, { useEffect, useState } from "react";
import { InputText } from "../../FormComponents/InputText";
import { Dropdown } from "../../FormComponents/Dropdown";
import { InputCheckbox } from "../../FormComponents/Checkbox";
import { Button, FormHelperText } from "@mui/material";
import ModalComponent from "../../Modal/ModalComponent";
import { useUserModal } from "../hooks/useUserModal";
import "../Users.scss";

const numberType = [
  { value: "Mobile", label: "Mobile" },
  { value: "Home", label: "Home" },
];

type Props = {
  data?: any;
  country: any;
};

export function UserModal({ country, data }: Props) {
  const {
    methods: { control, errors },
    onSubmit,
    setIsAdmin,
  } = useUserModal(data);

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
                <Dropdown
                  key="type"
                  name="type"
                  control={control}
                  label="Type of number"
                  options={numberType}
                />
                {errors.type && (
                  <FormHelperText error>{errors.type.message}</FormHelperText>
                )}
              </div>
              <InputText
                status={true}
                name="street_adress"
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
                label="Country"
              />
              {errors.country && (
                <FormHelperText error>{!!errors}</FormHelperText>
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
