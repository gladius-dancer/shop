import React from "react";
import { InputText } from "../../FormComponents/InputText";
import { Button } from "@mui/material";
import ModalComponent from "../../Modal/ModalComponent";
import { useCountryModal } from "../hooks/useCountryModal";

type Props = {
  data?: any;
};

export function CountryModal({ data }: Props) {
  const {
    methods: { control, errors },
    onSubmit,
    setIsAdmin,
  } = useCountryModal(data);

  return (
    <ModalComponent>
      <div className="add-modal">
        <form onSubmit={onSubmit} className="add-form">
          <InputText
            status={true}
            name="country_name"
            label="Country"
            control={control}
          />

          <Button type="submit" variant="contained">
            Add
          </Button>
        </form>
      </div>
    </ModalComponent>
  );
}
