import React from "react";
import { HighlightCard } from "../HighlightCard";
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
} from "./styles";

export function Dashboard() {
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
    </Container>
  );
}
