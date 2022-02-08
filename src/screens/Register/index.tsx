import React from "react";
import { Input } from "../../components/Form/Input";

import { Container, Header, Title, Form } from "./styles";

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Input placeholder="Descrição" />
        <Input placeholder="Valor" />
      </Form>
    </Container>
  );
}
