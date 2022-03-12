import {
  Container,
  Title,
  Header,
  TitleWrapper,
  SignInTitle,
  Footer,
  SignInButtons,
} from "./styles";

import AppleLogo from "../../assets/apple.svg";
import GoogleLogo from "../../assets/google.svg";
import AppLogo from "../../assets/logo.svg";

import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-native";

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      console.log("handleSignInWithGoogle");
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível fazer login com google.");
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
      </Footer>
    </Container>
  );
}
