import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormProps } from "./FormProps";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import { FormHelperText } from "@mui/material";

export const TimePicker = ({
  name,
  label,
  control,
}: FormProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <MobileTimePicker
          label={label}
          onChange={onChange}
          value={value}
        />
      )}
    />
  );
};
