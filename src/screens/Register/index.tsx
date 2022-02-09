import React, { useState } from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

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

  function handleSelectType(type: "up" | "down") {
    setTransactionType(type);
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
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
