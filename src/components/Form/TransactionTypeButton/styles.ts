import styled, { css } from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

interface IconProps {
  type: "income" | "outcome";
}

interface TransactionProps {
  isSelected: boolean;
  type: "income" | "outcome";
}

export const Container = styled(TouchableOpacity)<TransactionProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: ${({ isSelected }) => (isSelected ? 0 : 1.5)}px;

  border-style: solid;

  border-color: ${({ theme }) => theme.colors.text_light};
  border-radius: 5px;

  padding: 16px;

  ${({ isSelected, type }) =>
    isSelected &&
    type === "income" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ isSelected, type }) =>
    isSelected &&
    type === "outcome" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "income" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
