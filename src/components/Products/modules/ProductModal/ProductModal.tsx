import React from "react";
import { InputText } from "../../../FormComponents/InputText";
import { MultiLine } from "../../../FormComponents/MultiLine";
import { Dropdown } from "../../../FormComponents/Dropdown";
import { Button, FormHelperText } from "@mui/material";
import ModalComponent from "../../../Modal/ModalComponent";
import { useProductModalForm } from "./hooks/useProductModalForm";

type Props = {
  data?: any;
  categories: any;
};

export function ProductModal({ categories, data }: Props) {
  const {
    methods: { control, errors, register },
    onSubmit,
  } = useProductModalForm(data);

  return (
    <ModalComponent>
      <div className="add-modal">
        <form onSubmit={onSubmit} className="add-form">
          <InputText
            status={true}
            register={register}
            name="name"
            label="Name"
            control={control}
          />
          <MultiLine
            register={register}
            name="description"
            label="Description"
            control={control}
          />
          <InputText
            status={true}
            name="price"
            label="Price"
            control={control}
          />
          <div className="counts">
            <InputText
              status={true}
              name="quantity"
              label="Count"
              control={control}
              register={register}
            />
            <InputText
              status={true}
              name="discount"
              label="Discount"
              control={control}
              register={register}
            />
          </div>
          <Dropdown
            key="category"
            name="category"
            control={control}
            options={categories}
            register={register}
          />
          {errors.category && (
            <FormHelperText error>{errors.category.message}</FormHelperText>
          )}
          <InputText
            status={true}
            name="images"
            label="Image link"
            control={control}
            register={register}
          />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </form>
      </div>
    </ModalComponent>
  );
}
