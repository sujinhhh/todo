import React from "react";
import { Text } from "react-native";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Constants from "expo-constants";
import Button from "../components/Button";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #ea80fc;
  margin-bottom: 12px;
`;

const Input = styled.TextInput`
  width: 100%;
  border: 1px solid #ea80fc;
  padding: 8px;
  font-size: 15px;
  margin-bottom: 12px;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;

export default function Form({ navigation }) {
  const [date, setDate] = React.useState("");
  const [text, setText] = React.useState("");

  const store = async () => {
    if (date === "") return;
    if (text === "") return;

    let list = await AsyncStorage.getItem("list");
    if (list === "null") {
      list = [];
    } else {
      list = JSON.parse(list);
    }
    list.push({
      id: Math.random() * 1234,
      date,
      text,
    });
    await AsyncStorage.setItem("list", JSON.stringify(list));
    navigation.goBack();
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Contents>
          <Label>제목</Label>
          <Input
            placeholder={"YYYY-MM-DD 형식으로 입력하세요"}
            value={date}
            onChangeText={(value) => setDate(value)}
          />

          <Label>내용</Label>
          <Input
            multiline={true}
            style={{ height: 200 }}
            value={text}
            onChangeText={(value) => setText(value)}
          />
        </Contents>
        <Button onPress={store}>저장</Button>
      </KeyboardAvoidingView>
    </Container>
  );
}
