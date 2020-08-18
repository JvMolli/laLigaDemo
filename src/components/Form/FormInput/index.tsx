import React, { ChangeEvent } from "react";

import FormItem from "../FormItem";

import "./FormInput.scss";

type FormInputProps = {
  labelText?: string;
  placeholder: string;
  type?: "text" | "email" | "password";
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  animate?: "right" | "left";
  required?: boolean;
  value?: string;
};

export const FormInput: React.FC<FormInputProps> = ({
  labelText,
  placeholder,
  type = "text",
  onChange,
  animate,
  required = false,
  value,
}) => (
  <FormItem>
    <label style={{ color: "white" }}>{labelText}</label>
    <br />
    <input
      className={`form-input animation-${animate}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      value={value}
    />
  </FormItem>
);
