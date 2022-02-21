import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardsProps,
} from "../../components/TransactionCard";
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
  const [cardData, setCardData] = useState<CardListProps[]>([]);

  async function loadTransactions() {
    const dataKey = "@gofinances/transactions";

    const storageData = await AsyncStorage.getItem(dataKey);
    const transactions = storageData ? JSON.parse(storageData) : [];

    //TODO: format transactions
    const formatedTransactions = transactions.map((item) => {});
  }

  useEffect(() => {}, []);

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
