import { useState } from "react";
import {
  Container,
  Title,
  Header,
  TitleWrapper,
  SignInTitle,
  Footer,
  SignInButtons,
} from "./styles";
import { ActivityIndicator, Alert } from "react-native";

import { useAuth } from "../../hooks/auth";
import { RFValue } from "react-native-responsive-fontsize";

import { SignInSocialButton } from "../../components/SignInSocialButton";
import AppleLogo from "../../assets/apple.svg";
import GoogleLogo from "../../assets/google.svg";
import AppLogo from "../../assets/logo.svg";
import { useTheme } from "styled-components";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível fazer login com google.");
    } finally {
      setIsLoading(false);
    }
  }
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

      <Footer>
        <SignInButtons>
          <SignInSocialButton
            title="Entre com Google"
            svg={GoogleLogo}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton title="Entre com Apple" svg={AppleLogo} />
        </SignInButtons>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
