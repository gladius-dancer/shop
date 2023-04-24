import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormProps } from "./FormProps";

export const InputText = ({
  name,
  register,
  label,
  control,
  status,
  defaultValue,
  fullWith,
}: FormProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          {...register(name)}
          label={label}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth={fullWith}
          variant="outlined"
          disabled={status ? false : true}
          // size={size}
          defaultValue={defaultValue}
        />
      )}
    />
  );
};
