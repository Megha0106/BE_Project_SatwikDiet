import {} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import HomeScreen from "./HomeScreen";
import ResultScreen from "./ResultScreen";

export default function HomeScreenStack() {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Result" component={ResultScreen} />
    </HomeStack.Navigator>
  );
}
