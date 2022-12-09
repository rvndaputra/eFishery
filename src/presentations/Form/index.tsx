import type { FC } from "react";
import { useCallback } from "react";

import JSON2Form from "json-reactform";

interface FormProps {
  model: Record<string, unknown>;
  onSubmit: (value: unknown) => void;
}

const Form: FC<FormProps> = (props) => {
  const { model, onSubmit } = props;

  const handleOnSubmit = useCallback(
    (values) => {
      onSubmit(values);
    },
    [onSubmit]
  );

  return <JSON2Form model={model} onSubmit={handleOnSubmit} />;
};

export default Form;
