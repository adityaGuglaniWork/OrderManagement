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
import SelectTasks from './src/components/SelectTasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';
import SplashScreen from './src/components/SplashScreen';
import TasksList from './src/components/TasksList';
import { TASK_PACKING } from './constants';
import PackingTask from './src/components/PackingTask';
import DeliveryTask from './src/components/DeliveryTask';
import { Header } from 'react-native/Libraries/NewAppScreen';
import ScanningQRScreen from './src/components/ScanningQRScreen';
import Scan from './src/components/Scan';

export const AuthContext = React.createContext("auth");

const ASYNC_KEY_USER = "user";
const store = configureStore();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const Stack = createNativeStackNavigator();

  const onLogout = () => {
    AsyncStorage.removeItem(ASYNC_KEY_USER);
    setLoggedInUser(null);
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
        <Tab.Screen name="Tasks" component={SelectTasks} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  const SplashStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash">
          {(props) => <SplashScreen onLoadingComplete={() => { setDataLoaded(true) } } /> }
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Login Screen">
          {(props) => <LoginScreen onLoginComplete={ saveUserInfo } /> }
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  const auth = { loggedInUser, onLogout, saveUserInfo };
  const AppStack = () => {
    return (
      <AuthContext.Provider value={auth}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown : false}} />
          <Stack.Screen name="TasksList" component={TasksList} />
          <Stack.Screen name="TaskDetail">
            {({ route, navigation }) => {
              const taskId = route.params.taskId;
              return ((route.params.taskType == TASK_PACKING) ? <PackingTask taskId={taskId} navigation={navigation} /> : <DeliveryTask taskId={taskId} navigation={navigation} />);
            }} 
          </Stack.Screen>
          <Stack.Screen name="Scan" component={ScanningQRScreen} />
        </Stack.Navigator>
      </AuthContext.Provider>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        { (dataLoaded === false)? <SplashStack /> : (loggedInUser === null) ? <AuthStack /> : <AppStack />  }
      </NavigationContainer>
    </Provider>
  );
}


