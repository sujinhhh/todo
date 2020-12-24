import React, { useState, useContext } from "react";
import _ from "lodash";
import { Platform } from "react-native";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { WordsContext } from "./WordsContextProvider";

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Contents = styled.ScrollView`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 30px;
  color: dodgerblue;
  border: 1px solid dodgerblue;
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

export default function InputWordsGame({ navigation }) {
  const [words, setWords] = useContext(WordsContext);
  const [inputWord, setInputWord] = useState("");

  const addWords = () => {
    if (inputWord === "") {
      return;
    }
    setWords([...words, inputWord]);
    setInputWord("");
  };

  const handleRemove = (index) => {
    // e.currentTarget._nativeTag
    const a = index;

    const b = _.pullAt(words, [a]);
    // console.log(b);
    console.log(b);
    return setWords([...words]);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <HeaderContainer>
          <Title> 초성글자 넣기</Title>
        </HeaderContainer>
        <Contents>
          {words.map((item, index) => {
            return (
              <TodoItem key={index}>
                <TodoItemText>{item}</TodoItemText>
                <TotoItemButton
                  color="#b388ff"
                  title="삭제"
                  onPress={() => handleRemove(index)}
                />
              </TodoItem>
            );
          })}
        </Contents>

        <InputContainer>
          <Input
            placeholder="초성 글자 넣기"
            value={inputWord}
            onChangeText={(value) => setInputWord(value)}
          />

          <Button title="추가" onPress={addWords} />
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}
