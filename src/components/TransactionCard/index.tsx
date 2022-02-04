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

interface CardData {
  title: string;
  amount: string;
  category: Category;
  transactionDate: string;
}

interface Props {
  data: CardData;
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount>{data.amount}</Amount>
      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <TransactionDate>{data.transactionDate}</TransactionDate>
      </Footer>
    </Container>
  );
}
