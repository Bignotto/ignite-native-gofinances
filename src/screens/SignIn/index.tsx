import React, { useState } from "react";

import {
  Container,
  Title,
  Header,
  TitleWrapper,
  SignInTitle,
  Footer,
} from "./styles";

import AppleLogo from "../../assets/apple.svg";
import GoogleLogo from "../../assets/google.svg";
import AppLogo from "../../assets/logo.svg";

import { RFValue } from "react-native-responsive-fontsize";

export function SignIn() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <AppLogo width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle{"\n"}suas finanças de{"\n"}forma simples!
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com{"\n"}uma das contas abaixo:
        </SignInTitle>
      </Header>

      <Footer></Footer>
    </Container>
  );
}
