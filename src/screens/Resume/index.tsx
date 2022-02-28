import { CategorySummaryCard } from "../../components/Form/CategorySummaryCard";
import { Container, Header, Title } from "./styles";

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>
      <CategorySummaryCard />
      <CategorySummaryCard />
    </Container>
  );
}
