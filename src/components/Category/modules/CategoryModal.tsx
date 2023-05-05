import React from "react";
import { InputText } from "../../FormComponents/InputText";
import { Button, FormHelperText } from "@mui/material";
import ModalComponent from "../../Modal/ModalComponent";
import { useCategoryModal } from "../hooks/useCategoryModal";
import { Dropdown } from "../../FormComponents/Dropdown";

type Props = {
  categories?: any;
  data?: any;
};

export function CategoryModal({ categories, data }: Props) {
  const {
    methods: { control, errors },
    onSubmit,
  } = useCategoryModal(data);

  let parent_categories = categories.data.map((item) => {
    return {
      value: item.parent_category.id,
      label: item.parent_category.name,
    };
  });

  let filtered_categories = {};

  parent_categories.forEach((item) => {
    filtered_categories[item.value] = item;
  });

  filtered_categories = Object.keys(filtered_categories).map(
    (key) => filtered_categories[key]
  );

  return (
    <ModalComponent>
      <div className="add-modal">
        <form onSubmit={onSubmit} className="add-form">
          <InputText
            status={true}
            name="name"
            label="Category name"
            control={control}
          />
          <Dropdown
            options={filtered_categories}
            name="parent_category_id"
            label="Parent category"
            control={control}
          />
          <FormHelperText error>
            {errors.parent_category_id && errors.parent_category_id.message}
          </FormHelperText>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </form>
      </div>
    </ModalComponent>
  );
}
