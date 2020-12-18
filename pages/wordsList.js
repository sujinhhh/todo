import React, { useState, useEffect } from "react";
import _ from "lodash";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import styled from "styled-components/native";
import { color } from "react-native-reanimated";

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
  font-size: 30px;
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
const WordsList = ({ navigation }) => {
  const [words, setWords] = useState([]);
  const [inputWord, setInputWord] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("words")
      .then((data) => {
        if (data !== null) {
          setWords(JSON.parse(data));
        }
      })
      .catch((error) => console.log(error.massage));
  }, []);
  const store = (newWord) => {
    setWords(newWord);
    AsyncStorage.setItem("words", JSON.stringify(newWord));
  };

  return (
    // const renderItem = ({item}=>(<Item word={item.word} />))
    <Container>
      <Title> 초성게임 단어 추가하기 </Title>
      <WordButton
        title="게임시작하기"
        color="#8c9eff"
        onPress={() => {
          navigation.navigate("WordsGame");
        }}
      />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={words}
        renderItem={({ item }) => (
          <WordsListContents>
            <Label>{item.words}</Label>
            <WordButton
              title="삭제"
              onPress={() =>
                store(_.reject(words, (word) => word.id === item.id))
              }
            />
          </WordsListContents>
        )}
      />

      <Input value={inputWord} onChangeText={(value) => setInputWord(value)} />
      <Button
        onPress={() => {
          if (inputWord === "") {
            return;
          }
          const newItem = {
            id: Math.random(),
            words: inputWord,
          };
          store([...words, newItem]);
          setInputWord("");
        }}
      >
        단어추가
      </Button>
    </Container>
  );
};

export { WordsList };
