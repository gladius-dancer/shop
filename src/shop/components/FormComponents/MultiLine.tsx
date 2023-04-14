import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const MultiLine = ({ name, control, label }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={''}

            render={({
                         field: { onChange, value },
                         fieldState: { error },
                         formState,
                     }) => (
                <TextField
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    multiline
                    rows={3}
                />
            )}
        />
    );
};
