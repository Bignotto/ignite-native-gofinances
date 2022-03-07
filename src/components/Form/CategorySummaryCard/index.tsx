import { Amount, Container, Title } from "./styles";

interface SummaryCardProps {
  title: string;
  color: string;
  amount: string;
  icon?: string;
}

export function CategorySummaryCard({
  title,
  color,
  icon,
  amount,
}: SummaryCardProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
