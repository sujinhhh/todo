import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DairyList from "./pages/DairyList";
import Detail from "./pages/Detail";
import Form from "./pages/Form";
import Todos from "./pages/Todos";
import Play from "./pages/Play";
import WordsLists from "./pages/WordsLists";
import { WordsGameConsumer } from "./pages/WordsGameConsumer";
import WordsGame from "./pages/WordsGame";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRoueName="Home">
        <Drawer.Screen
          name="Todos"
          component={Todos}
          options={{ title: "오늘의 할일" }}
        />
        <Drawer.Screen
          name="DairyList"
          component={DairyList}
          options={{ title: "일기장" }}
        />
        <Drawer.Screen
          name="Play"
          component={Play}
          options={{ title: "게임 리스트" }}
        />

        <Stack.Screen
          name="WordsLists"
          component={WordsLists}
          options={{ title: "초성단어 리스트" }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ title: "일기자세히보기" }}
        />
        <Stack.Screen
          name="WordsGameConsumer"
          component={WordsGameConsumer}
          options={{ title: "게임하기" }}
        />
        <Stack.Screen
          name="Form"
          component={Form}
          options={{ title: "일기 작성" }}
        />
        {/* <Stack.Screen
          name="WordsGame"
          component={WordsGame}
          options={{ title: "일기 작성" }}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
