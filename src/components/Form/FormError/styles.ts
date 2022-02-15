import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.attention_light};

  border-radius: 5px;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  margin-left: 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.attention};
`;
