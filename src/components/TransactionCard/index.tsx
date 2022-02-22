import React from "react";

import {
  Container,
  Title,
  Icon,
  Footer,
  Amount,
  TransactionDate,
  Category,
  CategoryName,
} from "./styles";

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardsProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: Category;
  transactionDate: string;
}

interface Props {
  data: TransactionCardsProps;
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <TransactionDate>{data.transactionDate}</TransactionDate>
      </Footer>
    </Container>
  );
}
