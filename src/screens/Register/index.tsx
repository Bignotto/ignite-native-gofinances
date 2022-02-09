import React, { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState("up");
  const [categoryModalOpen, setCategoryModalOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  }>({
    id: "category",
    name: "Categoria",
  });

  function handleSelectType(type: "up" | "down") {
    setTransactionType(type);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }
  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Descrição" />
          <Input placeholder="Valor" />
          <TransactionTypes>
            <TransactionTypeButton
              title="Entrada"
              type="up"
              onPress={() => handleSelectType("up")}
              isSelected={transactionType === "up"}
            />
            <TransactionTypeButton
              title="Saída"
              type="down"
              isSelected={transactionType === "down"}
              onPress={() => handleSelectType("down")}
            />
          </TransactionTypes>
          <CategorySelectButton
            title="Categoria"
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button title="Enviar" />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={selectedCategory}
          colseSelectCategory={handleCloseSelectCategoryModal}
          setCategory={setSelectedCategory}
        />
      </Modal>
    </Container>
  );
}
