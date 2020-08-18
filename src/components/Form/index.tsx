import React from "react";

import "./form.scss";

type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  id: string;
};

const Form: React.FC<FormProps> = ({ id, children, onSubmit, onReset }) => (
  <form id={id} className={""} onSubmit={onSubmit} onReset={onReset}>
    {children}
  </form>
);

export default Form;
