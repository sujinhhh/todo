import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import List from "./pages/List";
import Detail from "./pages/Detail";
import Form from "./pages/Form";
import Todos from "./pages/Todos";
import Play from "./pages/Play";
import WordsGame from "./pages/WordsGame";
import { WordsList } from "./pages/WordsList";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="Todos"
          component={Todos}
          options={{ title: "오늘의 할일" }}
        />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Play" component={Play} />
        <Stack.Screen name="WordsGame" component={WordsGame} />
        <Stack.Screen name="WordsList" component={WordsList} />
        <Stack.Screen
          name="Form"
          component={Form}
          options={{ title: "일기 작성" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
