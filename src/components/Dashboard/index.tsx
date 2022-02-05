import React from "react";
import { HighlightCard } from "../HighlightCard";
import { TransactionCard, TransactionCardsProps } from "../TransactionCard";
import {
  Container,
  Header,
  UserInfo,
  UserWrapper,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  TransactionCards,
  Title,
  TransactionsList,
} from "./styles";

export interface CardListProps extends TransactionCardsProps {
  id: string;
}

export function Dashboard() {
  const cardData: CardListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de Site",
      amount: "R$ 1.740,00",
      transactionDate: "12/01/2022",
      category: { name: "Vendas", icon: "dollar-sign" },
    },
    {
      id: "2",
      type: "negative",
      title: "Café com Cookies",
      amount: "R$ 30,00",
      transactionDate: "10/01/2022",
      category: { name: "Snacks", icon: "coffee" },
    },
    {
      id: "3",
      type: "negative",
      title: "Pizza",
      amount: "R$ 3.740,00",
      transactionDate: "8/01/2022",
      category: { name: "Snacks", icon: "coffee" },
    },
    {
      id: "4",
      type: "positive",
      title: "Freelance",
      amount: "R$ 5.740,00",
      transactionDate: "5/01/2022",
      category: { name: "Vendas", icon: "dollar-sign" },
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/2911353?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Thiago!</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        <HighlightCard
          amount="R$ 1.740,00"
          title="Entradas"
          lastTransaction="Último movimento em 13 janeiro 2022"
          type="income"
        />
        <HighlightCard
          amount="R$ 860,00"
          title="Saídas"
          lastTransaction="Último movimento em 31 janeiro 2022"
          type="outcome"
        />
        <HighlightCard
          amount="R$ 16.141,00"
          title="Total"
          lastTransaction="Último movimento em 13 janeiro 2022"
          type="total"
        />
      </HighlightCards>

      <TransactionCards>
        <Title>Transações</Title>
        <TransactionsList
          data={cardData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </TransactionCards>
    </Container>
  );
}
