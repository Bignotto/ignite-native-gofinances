import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
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

interface FormData {
  [name: string]: any;
}

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    key: string;
    name: string;
  }>({
    key: "category",
    name: "Categoria",
  });

  const { control, handleSubmit } = useForm();

  function handleRegister({ name, amount }: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação!");
    if (selectedCategory.key === "category")
      return Alert.alert("Selecione a categoria da transação!");

    //TODO: 13:00: form validators with yup
    console.log({ name, amount });
  }

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <Input
              placeholder="Descrição"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
            />
            <Input
              placeholder="Valor"
              name="amount"
              control={control}
              keyboardType="numeric"
            />
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
              title={selectedCategory.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={selectedCategory}
            colseSelectCategory={handleCloseSelectCategoryModal}
            setCategory={setSelectedCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
