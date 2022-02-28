import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { CategorySummaryCard } from "../../components/Form/CategorySummaryCard";
import { categories } from "../../utils/categories";
import { CardListProps } from "../Dashboard";
import { Container, Content, Header, Title } from "./styles";

interface CategorySum {
  [key: string]: number;
}

export function Resume() {
  const [categoriesSummary, setCategoriesSummary] = useState<CategorySum>({});

  async function loadTransactions() {
    const dataKey = "@gofinances/transactions";

    const newSummary: CategorySum = {};

    const storageData = await AsyncStorage.getItem(dataKey);
    const transactions: CardListProps[] = storageData
      ? JSON.parse(storageData)
      : [];

    transactions.forEach((t) => {
      if (!newSummary[t.category]) newSummary[t.category] = Number(t.amount);
      else newSummary[t.category] += Number(t.amount);
    });

    setCategoriesSummary(newSummary);
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
        <Title>Resumo por Categoria</Title>
      </Header>
      <Content>
        {categories.map(
          (c) =>
            categoriesSummary[c.key] && (
              <CategorySummaryCard
                key={c.key}
                title={c.name}
                color={c.color}
                icon={c.icon}
                amount={categoriesSummary[c.key].toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              />
            )
        )}
      </Content>
    </Container>
  );
}
