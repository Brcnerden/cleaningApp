import React from "react";
import { Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreens";
import LoginScreen from "./screens/LoginScreens";
import SignInScreen from "./screens/SingInScreens";
import { Ionicons } from "@expo/vector-icons";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./redux/store";
import Toast from "react-native-toast-message";
import AddRoomScreens from "./screens/AddRoomScreens/AddRoomScreens";
import colors from "./colors";
import ScheduleScreens from "./screens/ScheduleScreens/ScheduleScreens";
import ProfileScreens from "./screens/ProfileScreens/ProfileScreens";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignIn: undefined;
  AddRoom: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AddRoom") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Takvim") {
            iconName = focused ? "pencil" : "pencil-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarLabel: ({ focused, color }) => {
          return (
            <View>
              <Text
                style={{
                  color: focused ? colors.primary : colors.titleColor,
                  fontSize: 10,
                  marginTop: 4,
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarStyle: {
          // height: 88,
          // flexDirection: "row",
          // justifyContent: "space-around",
          // backgroundColor: colors.white,
          // borderColor: colors.titleColor,
          // borderWidth: 1,
          // alignItems: "center" as const,
          height: 88,
          backgroundColor: colors.white,
          borderColor: colors.titleColor,
          borderWidth: 1,
          justifyContent: "center",
          paddingTop: 10,
        },

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.titleColor,
      })}
    >
      <Tab.Screen
        name="Ana Sayfa"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Takvim"
        component={ScheduleScreens}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AddRoom"
        component={AddRoomScreens}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreens}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const token = useSelector((state: RootState) => state.user.user?.token);

  return (
    <Stack.Navigator initialRouteName={token ? "Home" : "Login"}>
      {!token ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
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
