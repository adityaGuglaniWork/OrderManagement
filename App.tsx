/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/components/LoginScreen";
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './src/components/ProfileScreen';
import Tasks from './src/components/Tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext("auth");

const ASYNC_KEY_USER = "user";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(false);

  const onLogout = () => {
    AsyncStorage.removeItem(ASYNC_KEY_USER);
    setLoggedInUser(false);
  };

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_KEY_USER).then(asyncStorageRes => {
      if (asyncStorageRes !== null) {
        console.log(asyncStorageRes);
        setLoggedInUser(JSON.parse(asyncStorageRes));
      }
  });
  }, []);

  const saveUserInfo = (user) => {
    setLoggedInUser(user);
    AsyncStorage.setItem(ASYNC_KEY_USER, JSON.stringify(user));
  }

  function HomeScreen() {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator screenOptions={{ headerTitleAlign: 'center', tabBarActiveBackgroundColor: "maroon", tabBarInactiveBackgroundColor: "#ffffff", tabBarActiveTintColor: "#ffffff", tabBarInactiveTintColor: "maroon"}}>
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Tasks" component={Tasks} />
      </Tab.Navigator>
    );
  }

  const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center'}}>
        <Stack.Screen name="Login Screen">
          {(props) => <LoginScreen onLoginComplete={ saveUserInfo } /> }
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  const auth = { loggedInUser, onLogout, saveUserInfo };
  const AppStack = () => {
    const Stack = createNativeStackNavigator();
    return (
      <AuthContext.Provider value={auth}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" >
            {(props) => <HomeScreen />}
          </Stack.Screen>
        </Stack.Navigator>
      </AuthContext.Provider>
    );
  }

  return (
    <NavigationContainer>
      {(loggedInUser) ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}


