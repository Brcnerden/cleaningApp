import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreens";
import LoginScreen from "./screens/LoginScreens";
import SingInScreen from "./screens/SingInScreens";

import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "./redux/store";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SingIn: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "CLEANING APP",
              headerTintColor: "rgba(23, 137, 252, 1)",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
              },
              headerBackImage: () => (
                <Ionicons name="arrow-back" size={24} color="black" />
              ),
            }}
          />
          <Stack.Screen
            name="SingIn"
            component={SingInScreen}
            options={{
              title: "CLEANING APP",
              headerTintColor: "rgba(23, 137, 252, 1)",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
              },
              headerBackImage: () => (
                <Ionicons name="arrow-back" size={24} color="black" />
              ),
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
