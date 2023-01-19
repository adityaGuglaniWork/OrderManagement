/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SplashScreen from './src/components/SplashScreen';
import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const store = configureStore();
const Stack = createNativeStackNavigator();

const SplashStack = () => {
    
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash">
          {(props) => <SplashScreen /*onLoadingComplete={() => { console.log("asdoiasndsaoi");  setDataLoaded(true) } }*/ /> }
        </Stack.Screen>
      </Stack.Navigator>
    );
}
  
const RNApp = () => {
    return (
        <Provider store={store}>
      <NavigationContainer>
        <SplashStack/>
      </NavigationContainer>
    </Provider>
    );
}

AppRegistry.registerComponent(appName, () => App);