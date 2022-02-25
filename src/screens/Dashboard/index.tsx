import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

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

interface HighlightCardProps {
  amount: string;
}

interface HighlightCardsData {
  income: HighlightCardProps;
  outcome: HighlightCardProps;
  balance: HighlightCardProps;
}
export interface CardListProps extends TransactionCardsProps {
  id: string;
}

export function Dashboard() {
  const [cardData, setCardData] = useState<CardListProps[]>([]);

  const [highlightCardsData, setHighlightCardsData] =
    useState<HighlightCardsData>();

  async function loadTransactions() {
    const dataKey = "@gofinances/transactions";

    const storageData = await AsyncStorage.getItem(dataKey);
    const transactions = storageData ? JSON.parse(storageData) : [];

    let totalIncomeValue = 0;
    let totalOutcomeValue = 0;

    const formatedTransactions: CardListProps[] = transactions.map(
      (item: CardListProps) => {
        const fAmount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        if (item.transactionType === "income")
          totalIncomeValue += Number(item.amount);
        if (item.transactionType === "outcome")
          totalOutcomeValue += Number(item.amount);

        const fDate = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(
          item.transactionDate ? new Date(item.transactionDate) : Date.now()
        );

        return {
          id: item.id,
          name: item.name,
          amount: fAmount,
          transactionType: item.transactionType,
          category: item.category,
          transactionDate: fDate,
        };
      }
    );

    setHighlightCardsData({
      income: {
        amount: totalIncomeValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      outcome: {
        amount: totalOutcomeValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      balance: {
        amount: (totalIncomeValue - totalOutcomeValue).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });

    setCardData(formatedTransactions);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

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
          amount={
            highlightCardsData ? highlightCardsData.income.amount : "R$ 0"
          }
          title="Entradas"
          lastTransaction="Último movimento em 13 janeiro 2022"
          type="income"
        />
        <HighlightCard
          amount={
            highlightCardsData ? highlightCardsData.outcome.amount : "R$ 0"
          }
          title="Saídas"
          lastTransaction="Último movimento em 31 janeiro 2022"
          type="outcome"
        />
        <HighlightCard
          amount={
            highlightCardsData ? highlightCardsData.balance.amount : "R$ 0"
          }
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
