import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { addMonths, subMonths } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import { CategorySummaryCard } from "../../components/Form/CategorySummaryCard";
import { categories } from "../../utils/categories";
import { CardListProps } from "../Dashboard";
import {
  ChartContainer,
  Container,
  Content,
  Header,
  Title,
  MonthSelectContainer,
  MonthChangeButton,
  MonthTitle,
  MontChangeIcon,
} from "./styles";

interface CategorySum {
  [key: string]: number;
}

interface PieChartData {
  x: string;
  y: number;
  color: string;
}

export function Resume() {
  const [categoriesSummary, setCategoriesSummary] = useState<CategorySum>({});
  const [chartData, setChartData] = useState<PieChartData[]>();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const theme = useTheme();

  function handleDateChange(action: "next" | "prev") {
    if (action === "next") setSelectedDate(addMonths(selectedDate, 1));
    if (action === "prev") setSelectedDate(subMonths(selectedDate, 1));
  }

  async function loadTransactions() {
    const dataKey = "@gofinances/transactions";

    const newSummary: CategorySum = {};
    let outcomeTotal = 0;

    const storageData = await AsyncStorage.getItem(dataKey);
    const transactions: CardListProps[] = storageData
      ? JSON.parse(storageData)
      : [];

    const outcomeTransactions = transactions.filter(
      (t) => t.transactionType === "outcome"
    );

    outcomeTransactions.forEach((t) => {
      outcomeTotal += Number(t.amount);
      if (!newSummary[t.category]) {
        newSummary[t.category] = Number(t.amount);
      } else newSummary[t.category] += Number(t.amount);
    });

    const newChartData: PieChartData[] = Object.keys(newSummary).map((k) => {
      const categoryColor = categories.find((c) => c.key === k);
      return {
        x: `${((newSummary[k] / outcomeTotal) * 100).toFixed(2)}%`,
        y: newSummary[k],
        color: categoryColor ? categoryColor.color : "#000000",
      };
    });

    console.log(newChartData);
    setChartData(newChartData);
    setCategoriesSummary(newSummary);
  }

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

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelectContainer>
          <MonthChangeButton onPress={() => handleDateChange("prev")}>
            <MontChangeIcon name="chevron-left" />
          </MonthChangeButton>
          <MonthTitle>
            {Intl.DateTimeFormat("pt-BR", {
              month: "long",
              year: "numeric",
            }).format(selectedDate)}
          </MonthTitle>
          <MonthChangeButton onPress={() => handleDateChange("next")}>
            <MontChangeIcon name="chevron-right" />
          </MonthChangeButton>
        </MonthSelectContainer>
        {chartData && (
          <ChartContainer>
            <VictoryPie
              data={chartData}
              colorScale={chartData.map((d) => d.color)}
              style={{
                labels: {
                  fontSize: RFValue(14),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={70}
            />
          </ChartContainer>
        )}

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
