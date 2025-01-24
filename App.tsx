import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreens";
import LoginScreen from "./screens/LoginScreens";
import SingInScreen from "./screens/SingInScreens";

import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "./redux/store";
import Toast from "react-native-toast-message";
import AddRoomScreens from "./screens/AddRoomScreens/AddRoomScreens";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import DetailScreens from "./screens/DetailScreens/DetailScreens";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SingIn: undefined;
  AddRoom: undefined;
  Detail: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const AppNavigator = () => {
  const token = useSelector((state: RootState) => state.user.user?.token);

  return (
    <Stack.Navigator initialRouteName={token ? "Home" : "Login"}>
      {!token && (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
            // options={{
            //   title: "CLEANING APP",
            //   headerTintColor: "rgba(23, 137, 252, 1)",
            //   headerTitleStyle: {
            //     fontWeight: "bold",
            //     fontSize: 20,
            //   },
            //   headerBackImage: () => (
            //     <Ionicons name="arrow-back" size={24} color="black" />
            //   ),
            // }}
          />
          <Stack.Screen
            name="SingIn"
            component={SingInScreen}
            options={{ headerShown: false }}
            // options={{
            //   title: "CLEANING APP",
            //   headerTintColor: "rgba(23, 137, 252, 1)",
            //   headerTitleStyle: {
            //     fontWeight: "bold",
            //     fontSize: 20,
            //   },
            //   headerBackImage: () => (
            //     <Ionicons name="arrow-back" size={24} color="black" />
            //   ),
            // }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreens}
            options={{ headerShown: false }}
          />
        </>
      )}
      {token && (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddRoom"
            component={AddRoomScreens}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}
