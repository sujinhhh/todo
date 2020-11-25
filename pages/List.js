import React from "react";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Constants from "expo-constants";
import Button from "../components/Button";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";

const ListItem = styled.TouchableOpacity`
width:100%
padding:12px 0px;
border-bottom-color:#aaaaaa;
border-bottom-width:1px

`;
const Label = styled.Text`
  font-size: 20px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;

  margin: 20px auto;
`;
const HeaderButton = styled.Button``;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;

const Title = styled.Text`
  font-size: 30px;
  color: #c2185b;
  border: 1px solid #c2185b;
`;
// 구조 분해할당,  Destructuring
export default function List({ navigation }) {
  const [list, setList] = React.useState([]);
  const load = async () => {
    const data = await AsyncStorage.getItem("list");
    if (data !== null) {
      setList(JSON.parse(data));
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      load();
    });
    load();
    return unsubscribe;
  }, [navigation]);
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <HeaderContainer>
          <Title> ♥️ 나의 일기장 ♥️ </Title>
          <HeaderButton
            title="오늘의 할일 보기"
            color="#ff80ab"
            onPress={() => {
              navigation.navigate("Todos");
            }}
          />
        </HeaderContainer>

        <Contents>
          {_.sortBy(list, "date").map((item) => {
            return (
              <ListItem
                key={Math.random()}
                onPress={() =>
                  navigation.navigate("Detail", {
                    date: item.date,
                  })
                }
              >
                <Label> {item.date}</Label>
              </ListItem>
            );
          })}
        </Contents>
        <Button onPress={() => navigation.navigate("Form")}>
          새 일기 작성
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
}
