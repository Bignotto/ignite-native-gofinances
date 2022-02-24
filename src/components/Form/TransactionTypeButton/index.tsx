import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Icon, Title } from "./styles";

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

interface Props extends TouchableOpacityProps {
  title: string;
  type: "income" | "outcome";
  isSelected: boolean;
}

export function TransactionTypeButton({
  title,
  type,
  isSelected,
  ...rest
}: Props) {
  return (
    <Container {...rest} isSelected={isSelected} type={type}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}
