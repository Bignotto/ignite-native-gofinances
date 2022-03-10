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

      <Footer>
        <SignInButtons>
          <SignInSocialButton title="Entre com Google" svg={GoogleLogo} />
          <SignInSocialButton title="Entre com Apple" svg={AppleLogo} />
        </SignInButtons>
      </Footer>
    </Container>
  );
}
