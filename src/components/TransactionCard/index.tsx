import React from "react";
import { categories } from "../../utils/categories";

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

export interface TransactionCardsProps {
  transactionType: "income" | "outcome";
  name: string;
  amount: string;
  category: string;
  transactionDate: string;
}

interface Props {
  data: TransactionCardsProps;
}

export function TransactionCard({ data }: Props) {
  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.transactionType}>
        {data.transactionType === "outcome" && "- "}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <TransactionDate>{data.transactionDate}</TransactionDate>
      </Footer>
    </Container>
  );
}
