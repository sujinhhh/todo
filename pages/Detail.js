import React from "react";
import Container from "../components/Container";
import Contents from "../components/Contents";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";

const Text = styled.Text`
  font-size: 20px;
  padding-top: 20px;
`;
const Title = styled.Text`
  font-size: 20px;
  padding-top: 20px;
  color: #7c4dff;
`;
export default function Detail({ navigation, route }) {
  navigation.setOptions({ title: route.params.date });
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    AsyncStorage.getItem("list").then((data) => {
      const list = JSON.parse(data);
      const diary = list.find((element) => element.date === route.params.date);
      setText(diary.text);
    });
  }, []);
  return (
    <Container>
      <Contents>
        <Title> Title : {route.params.date}</Title>
        <Text>{text}</Text>
      </Contents>
      <Button onPress={() => navigation.navigate("List")}>
        일기 리스트 보기
      </Button>
    </Container>
  );
}
