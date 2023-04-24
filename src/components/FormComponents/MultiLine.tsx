import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const MultiLine = ({
  name,
  control,
  register,
  label,
  defaultValue,
  value,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          {...register(name)}
          key={name}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          defaultValue={defaultValue}
          multiline
          rows={3}
        />
      )}
    />
  );
};
