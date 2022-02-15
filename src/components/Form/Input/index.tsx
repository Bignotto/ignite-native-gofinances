import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { FormError } from "../FormError";

import { Container } from "./styles";

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
}

export function Input({ control, name, error, ...rest }: Props) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Container {...rest} onChangeText={onChange} value={value} />
        )}
      />
      {error && <FormError title={error} />}
    </>
  );
}
