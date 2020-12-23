import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { WordsContext } from "./WordsContextProvider";
import styled from "styled-components";

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 24px;
`;

export default function WordsLists() {
  const [words, setWords] = useContext(WordsContext);

  return (
    <Container>
      {words.map((item) => {
        return (
          <>
            <Text>{item}</Text>
            <Button title="del" />
          </>
        );
      })}
    </Container>
  );
}
