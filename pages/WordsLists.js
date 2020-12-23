import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import InputWordsGame from "./InputWordsGame";
import styled from "styled-components";
import { WordsContextProvider } from "./WordsContextProvider";

export default function WordsLists() {
  return (
    <WordsContextProvider>
      <InputWordsGame />
    </WordsContextProvider>
  );
}
