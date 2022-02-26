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
  Loading,
} from "./styles";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

interface HighlightCardProps {
  amount: string;
  lastDate: string;
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
  const [isLoading, setIsLoading] = useState(true);

  const [cardData, setCardData] = useState<CardListProps[]>([]);

  const [highlightCardsData, setHighlightCardsData] =
    useState<HighlightCardsData>();

  const theme = useTheme();

  function getLastTransactionDate(transactions: CardListProps[]) {
    return Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(
      Math.max.apply(
        Math,
        transactions.map((t) => Number(t.transactionDate))
      )
    );
  }

  async function loadTransactions() {
    const dataKey = "@gofinances/transactions";

    const storageData = await AsyncStorage.getItem(dataKey);
    const transactions: CardListProps[] = storageData
      ? JSON.parse(storageData)
      : [];

    let totalIncomeValue = 0;
    let totalOutcomeValue = 0;

    const lastIncomeDate = getLastTransactionDate(
      transactions.filter((t) => t.transactionType === "income")
    );

    const lastOutcomeDate = getLastTransactionDate(
      transactions.filter((t) => t.transactionType === "income")
    );

    const lasTransactionDate = getLastTransactionDate(transactions);

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
        lastDate: lastIncomeDate,
      },
      outcome: {
        amount: totalOutcomeValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastDate: lastOutcomeDate,
      },
      balance: {
        amount: (totalIncomeValue - totalOutcomeValue).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastDate: lasTransactionDate,
      },
    });

    setCardData(formatedTransactions);
    setIsLoading(false);
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
      {isLoading ? (
        <Loading>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </Loading>
      ) : (
        <>
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
              lastTransaction={
                highlightCardsData
                  ? highlightCardsData.income.lastDate
                  : "0/0/0"
              }
              type="income"
            />
            <HighlightCard
              amount={
                highlightCardsData ? highlightCardsData.outcome.amount : "R$ 0"
              }
              title="Saídas"
              lastTransaction={
                highlightCardsData
                  ? highlightCardsData.outcome.lastDate
                  : "0/0/0"
              }
              type="outcome"
            />
            <HighlightCard
              amount={
                highlightCardsData ? highlightCardsData.balance.amount : "R$ 0"
              }
              title="Total"
              lastTransaction={
                highlightCardsData
                  ? highlightCardsData.balance.lastDate
                  : "0/0/0"
              }
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
        </>
      )}
    </Container>
  );
}
