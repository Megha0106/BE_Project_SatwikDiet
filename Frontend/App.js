import { useState, useEffect,useCallback } from "react";
import {
  View
} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome' 

import HomeScreenStack from "./components/HomeScreenStack";
import ProfileScreen from "./components/ProfileScreen";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  

  const Tab = createBottomTabNavigator()

  return (
    <View
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}
    >
      <NavigationContainer>
      <Tab.Navigator

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home'
            } else if (route.name === 'Profile') {
              iconName = 'user';
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          headerShown:false,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: 'gray',
          tabBarActiveBackgroundColor:"#6560D7",
          headerStyle:{
            backgroundColor:"blue"
          }
        })}>
        <Tab.Screen name="Home" component={HomeScreenStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
}

/*
formData: FormData {
  "_parts": Array [
    Array [
      "file:",
      "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FClassification-f534797f-194e-4423-8efa-7973e5ce5aa6/ImagePicker/b4c3e9c6-2d4d-47cc-8c54-0f52a5f3a8f4.jpeg",
    ],
  ],
}
*/
