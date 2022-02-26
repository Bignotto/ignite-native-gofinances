import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

type NavigationProps = {
  navigate: (screen: string) => void;
};

interface FormData {
  [name: string]: any;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("Informe um valor positivo")
    .required("Informe um valor"),
});

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
  const dataKey = "@gofinances/transactions";

  const navigation = useNavigation<NavigationProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleRegister({ name, amount }: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação!");

    if (selectedCategory.key === "category")
      return Alert.alert("Selecione a categoria da transação!");

    const newTransaction = {
      id: String(uuid.v4()),
      name,
      amount,
      transactionType,
      category: selectedCategory.key,
      transactionDate: Date.now(),
    };

    try {
      // await AsyncStorage.clear();
      const storageData = await AsyncStorage.getItem(dataKey);
      const transactions = storageData ? JSON.parse(storageData) : [];
      console.log({ transactions });

      const newTransactions = [...transactions, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(newTransactions));

      reset();
      setTransactionType("");
      setSelectedCategory({ key: "category", name: "Categoria" });

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Algum proglema com async storage");
    }
  }

  function handleSelectType(type: "income" | "outcome") {
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
              error={errors.name && errors.name.message}
            />
            <Input
              placeholder="Valor"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                title="Entrada"
                type="income"
                onPress={() => handleSelectType("income")}
                isSelected={transactionType === "income"}
              />
              <TransactionTypeButton
                title="Saída"
                type="outcome"
                isSelected={transactionType === "outcome"}
                onPress={() => handleSelectType("outcome")}
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
