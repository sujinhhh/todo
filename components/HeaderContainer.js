import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: row;

  margin: 20px auto;
`;
const Button = styled.Button``;
const Title = styled.Text`
  font-size: 30px;
  color: dodgerblue;
  border: 1px solid dodgerblue;
`;

export default function HeaderContainer({ navigation }) {
  return (
    <Container>
      <Title> ♥️ 나의 일기장 ♥️ </Title>
      <Button
        title="일기장"
        color="#8c9eff"
        onPress={() => {
          navigation.navigate("Todos");
        }}
      />
    </Container>
  );
}
