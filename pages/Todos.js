import React, { useState, useEffect } from "react";
import { StyleSheet, Platform, FlatList, Image } from "react-native";
import styled from "styled-components/native";
import Constants from "expo-constants";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import produce from "immer";

AsyncStorage.getItem("list")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(error.massage);
  });
// AsyncStorage.setItem("list", "list value")
//   .then(() => {
//     console.log("saved");
//   })
//   .catch((error) => console.log(error.massage));

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Contents = styled.View`
  flex: 1;
`;

const HeaderContainer = styled.View`
  flex-direction: row;

  margin: 20px auto;
`;

const InputContainer = styled.View`
  flex-direction: row;
  padding: 8px;
`;
const Input = styled.TextInput`
  border: 1px solid #e5e5e5;
  flex: 1;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;

const Button = styled.Button``;

const TodoItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;
const TodoItemText = styled.Text`
  font-size: 20px;
  flex: 1;
  padding: 10px;
`;
const TotoItemButton = styled.Button`
  align-items: flex-end;
`;

const Check = styled.TouchableOpacity`
  margin-right: 4px;
  margin-left: 10px;
`;

const IconImage = styled.Image`
  width: 60px;
  height: 60px;
`;

const Title = styled.Text`
  font-size: 30px;
  color: dodgerblue;

  border: 1px solid dodgerblue;
`;

export default function Todos() {
  const [list, setList] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("list")
      .then((data) => {
        if (data !== null) {
          setList(JSON.parse(data));
        }
      })
      .catch((error) => console.log(error.massage));
  }, []);

  const store = (newList) => {
    setList(newList);
    AsyncStorage.setItem("list", JSON.stringify(newList));
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <HeaderContainer>
          <Title> ♥️ 오늘의 할일 ♥️ </Title>
          <Button title="일기" color="#8c9eff" onPress={() => {}} />
        </HeaderContainer>
        <Contents>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <TodoItem>
                <Check
                  onPress={() => {
                    store(
                      produce(list, (draft) => {
                        const index = list.indexOf(item);
                        draft[index].done = !draft[index].done;
                      })
                    );
                  }}
                >
                  {item.done ? (
                    <IconImage source={require("./assets/jin.png")} />
                  ) : (
                    <IconImage source={require("./assets/chan.png")} />
                  )}
                </Check>
                <TodoItemText>{item.todo}</TodoItemText>
                <TotoItemButton
                  color="pink"
                  title=" 삭제 "
                  onPress={() => {
                    store(_.reject(list, (element) => element.id === item.id));
                  }}
                />
              </TodoItem>
            )}
          />
        </Contents>
        <InputContainer>
          <Input
            value={inputTodo}
            placeholder="오늘 해야 할 일을 적어보삼"
            onChangeText={(value) => setInputTodo(value)}
          />
          <Button
            title="추가"
            onPress={() => {
              if (inputTodo === "") {
                return;
              }
              const newItem = {
                id: new Date().getTime().toString(),
                todo: inputTodo,
                done: false,
              };
              store([...list, newItem]);
              setInputTodo("");
            }}
          />
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}
