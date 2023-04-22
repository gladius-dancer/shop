import React from "react";
import { InputText } from "../../../FormComponents/InputText";
import { MultiLine } from "../../../FormComponents/MultiLine";
import { Dropdown } from "../../../FormComponents/Dropdown";
import { Button } from "@mui/material";
import ModalComponent from "../../../Modal/ModalComponent";
import { useProductModalForm } from "./hooks/useProductModalForm";

type Props = {
  data?: any;
  categories: any;
};

export function ProductModal({ categories, data }: Props) {
  const {
    methods: { control },
    onSubmit,
  } = useProductModalForm(data);

  return (
    <ModalComponent>
      <div className="add-modal">
        <form onSubmit={onSubmit} className="add-form">
          <InputText status={true} name="name" label="Name" control={control} />
          {/*<MultiLine*/}
          {/*    name="description"*/}
          {/*    label="Description"*/}
          {/*    control={control}*/}
          {/*/>*/}
          <InputText
            status={true}
            name="price"
            label="Price"
            control={control}
          />
          <div className="counts">
            <InputText
              status={true}
              name="count"
              label="Count"
              control={control}
            />
            <InputText
              status={true}
              name="discount"
              label="Discount"
              control={control}
            />
          </div>
          <Dropdown
            key="category"
            name="category"
            control={control}
            options={categories}
          />
          <InputText
            status={true}
            name="image"
            label="Image link"
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
