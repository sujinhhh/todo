import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import styled from "styled-components/native";
import { WordsContextProvider } from "./WordsContextProvider";
import WordsGame from "./WordsGame";

const WordsGameConsumer = () => {
  return (
    <WordsContextProvider>
      <WordsGame />
    </WordsContextProvider>
  );
};

export { WordsGameConsumer };
