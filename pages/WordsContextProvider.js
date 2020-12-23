import React, { useState, createContext, useEffect } from "react";
import _ from "lodash";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import styled from "styled-components/native";

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

export const WordsContext = createContext([]);

export const WordsContextProvider = ({ children }) => {
  const [words, setWords] = useState([]);

  const initData = async () => {
    try {
      const list = await AsyncStorage.getItem("words");
      if (list !== null) {
        setWords(JSON.parse(list));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  return (
    <WordsContext.Provider value={[words, setWords]}>
      {children}
    </WordsContext.Provider>
  );
};
