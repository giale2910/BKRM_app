import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider} from "native-base";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "../screens/HomeScreen/HomeScreen"
import LoginScreen from "../screens/AuthScreen/LoginScreen/LoginScreen"

import theme from "../theme";

const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
    <NavigationContainer >
        <NativeBaseProvider theme={theme()}  >
          <Stack.Navigator>  
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}  />
            <Stack.Screen name="Home"  component={HomeScreen}  options={{ headerShown: false,headerLeft: ()=> null}}  />   
          </Stack.Navigator>
        </NativeBaseProvider>
    </NavigationContainer> 
);      
};

export default MyStack;

