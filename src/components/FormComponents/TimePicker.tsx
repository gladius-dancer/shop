import React from "react";
import {Controller} from "react-hook-form";
import {FormProps} from "./FormProps";
import {MobileTimePicker} from "@mui/x-date-pickers/MobileTimePicker";

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
