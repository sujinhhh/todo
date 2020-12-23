import React, { useState, useContext } from "react";
import _ from "lodash";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import styled from "styled-components/native";
import { WordsContext } from "./WordsContextProvider";

const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 50px;
`;

const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: black;
  margin-bottom: 12px;
`;

const Input = styled.TextInput`
  width: 100%;
  border: 1px solid #ea80fc;
  padding: 8px;
  font-size: 15px;
  margin-bottom: 12px;
`;

const Title = styled.Text`
  font-size: 20px;
  color: dodgerblue;
  border: 1px solid dodgerblue;
`;
const WordsListContents = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;
const WordButton = styled.Button``;

export default function InputWordsGame() {
  const [words, setWords] = useContext(WordsContext);
  const [inputWord, setInputWord] = useState("");

  const addWords = () => {
    if (inputWord === "") {
      return;
    }

    setWords([...words, inputWord]);
    setInputWord("");
  };

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.header}>Header</Text>
        {words.map((item) => {
          return <Title key={Math.random()}>{item}</Title>;
        })}
      </View>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="초성 글자 넣기"
              value={inputWord}
              onChangeText={(value) => setInputWord(value)}
            />
            <View style={styles.btnContainer}>
              <Button title="추가" onPress={addWords} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  inner: {
    padding: 24,
    flex: 2,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
