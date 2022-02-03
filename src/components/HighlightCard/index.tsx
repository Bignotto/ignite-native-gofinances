import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

interface Props {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "income" | "outcome" | "total";
}

const icon = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
  total: "dollar-sign",
};

export function HighlightCard({ amount, lastTransaction, title, type }: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Footer>
        <Amount>{amount}</Amount>
        <LastTransaction>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
