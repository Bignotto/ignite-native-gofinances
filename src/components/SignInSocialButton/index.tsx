import React from "react";
import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

import { Button, ImageContaier, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({ svg: Svg, title, ...rest }: Props) {
  return (
    <Button {...rest}>
      <ImageContaier>
        <Svg />
      </ImageContaier>
      <Title>{title}</Title>
    </Button>
  );
}
