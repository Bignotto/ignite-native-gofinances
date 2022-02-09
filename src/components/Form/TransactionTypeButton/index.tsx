import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Icon, Title } from "./styles";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

interface Props extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
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
