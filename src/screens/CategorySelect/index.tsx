import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";

interface Category {
  id: string;
  name: string;
}

interface Props {
  category?: Category;
  setCategory?: (category: Category) => void;
  colseSelectCategory?: () => void;
}
export function CategorySelect({
  category,
  setCategory,
  colseSelectCategory,
}: Props) {
  return (
    <Container>
      <Header>
        <Title>{category?.name}</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <Footer>
        <Button title="Selecionar" onPress={colseSelectCategory} />
      </Footer>
    </Container>
  );
}
