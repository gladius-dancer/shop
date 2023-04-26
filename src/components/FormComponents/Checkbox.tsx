import React from "react";
import { FormControl, FormControlLabel, FormHelperText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { FormProps } from "./FormProps";

export const InputCheckbox = ({
  name,
  error,
  label,
  checked,
  onChange,
}: FormProps) => {
  return (
    <FormControl error={error}>
      <div className="d-flex align-items-center">
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={onChange}
              name={name}
              color="primary"
            />
          }
          label={label}
        />
        {error && <FormHelperText>Please agree ...</FormHelperText>}
      </div>
    </FormControl>
  );
};
