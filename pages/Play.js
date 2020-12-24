import React from "react";
import Container from "../components/Container";
import Contents from "../components/Contents";
import styled from "styled-components/native";
import Button from "../components/Button";

const Text = styled.Text`
  font-size: 20px;
  padding-top: 20px;
`;
const Title = styled.TouchableOpacity`
  font-size: 20px;
  padding-top: 20px;
  color: #7c4dff;
`;
export default function Play({ navigation }) {
  return (
    <Container>
      <Contents>
        <Title onPress={() => navigation.navigate("WordsGameConsumer")}>
          <Text>초성게임 GoGo</Text>
        </Title>
      </Contents>
      <Button onPress={() => navigation.navigate("Todos")}>홈으로</Button>
    </Container>
  );
}
