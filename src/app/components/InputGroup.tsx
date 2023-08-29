import React from "react";
import { useField, ErrorMessage } from "formik";
import { TextField } from "@mui/material";

const InputGroup = (props: any) => {
  const [field, meta] = useField(props);

  const { label, name, type } = props;

  return (
    <>
      <TextField
        label={label}
        className={`form-control ${
          meta.error && meta.touched ? "is-invalid" : ""
        }`}
        {...field}
        margin="normal"
        fullWidth
        type={type}
      />
      <ErrorMessage component="div" name={name} className="invalid-feedback" />
      <br />
    </>
  );
};

export default InputGroup;