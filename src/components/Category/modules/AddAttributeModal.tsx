import React, { useState } from "react";
import { InputText } from "../../FormComponents/InputText";
import { Button, FormHelperText } from "@mui/material";
import ModalComponent from "../../Modal/ModalComponent";
import { useAddAttributeModal } from "../hooks/useAddAttributeModal";
import { useFieldArray, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";

export function AddAttributeModal() {
  const {
    methods: { control, errors, register },
    onSubmit,
  } = useAddAttributeModal();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <ModalComponent>
      <div className="add-modal">
        <form onSubmit={onSubmit} className="add-form">
          <InputText
            status={true}
            name="attribute_name"
            label="Attribute name"
            control={control}
          />
          {fields.map((field, index) => (
            <div key={field.id} className="d-flex ">
              <TextField
                {...register(`variants.${index}.name`)}
                label={`Variant ${index + 1}`}
              />
              <Button onClick={() => remove(index)}>
                <TextDecreaseIcon />
              </Button>
            </div>
          ))}
          <Button onClick={() => append({ name: `` })}>Add Item</Button>

          <Button type="submit" variant="contained">
            Save
          </Button>
        </form>
      </div>
    </ModalComponent>
  );
}
