import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import _ from "lodash";
import { WordsContext } from "./WordsContextProvider";

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 24px;
`;

const Quiz = styled.Text`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;
const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: black;
  margin-bottom: 12px;
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

const Contents = styled.View`
  flex: 1;
`;
const HeadButton = styled.Button``;
const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background: #e5e5e5;
  justify-content: center;
  align-items: center;
`;

function getInitials(string) {
  return string
    .split("")
    .map((char) => {
      const index = (char.charCodeAt(0) - 44032) / 28 / 21;
      if (index >= 0) return String.fromCharCode(index + 4352);
      return char;
    })
    .join("");
}

export default function WordsGame({ navigation }) {
  const [words, setWords] = useContext(WordsContext);
  const [quizList, setQuizList] = React.useState(_.shuffle(words));
  const [mode, setMode] = React.useState("quiz");

  const onPress = React.useCallback(() => {
    if (mode === "answer") {
      setQuizList(quizList.slice(1));
    }
    setMode(mode === "quiz" ? "answer" : "quiz");
  }, [mode]);
  const retry = React.useCallback(() => {
    console.log(words);
    setQuizList(_.shuffle(words));
    setMode("quiz");
  }, [quizList]);

  return (
    <Container>
      <HeaderContainer>
        <Title> 초성게임 </Title>
        <HeadButton
          title="홈으로 가기"
          color="#8c9eff"
          onPress={() => {
            navigation.navigate("Todos");
          }}
        />
        <HeadButton
          title="초성단어 넣기"
          color="#8c9eff"
          onPress={() => {
            navigation.navigate("WordsLists");
          }}
        />
      </HeaderContainer>

      <Contents>
        {quizList.length ? (
          <Quiz>
            {mode === "quiz" ? getInitials(quizList[0]) : quizList[0]}
          </Quiz>
        ) : (
          <Quiz>게임 끝</Quiz>
        )}
      </Contents>

      {quizList.length ? (
        <Button onPress={onPress}>
          <Label>{mode === "quiz" ? "정답확인" : "새문제"}</Label>
        </Button>
      ) : (
        <Button onPress={retry}>
          <Label>다시풀기</Label>
        </Button>
      )}
    </Container>
  );
}
