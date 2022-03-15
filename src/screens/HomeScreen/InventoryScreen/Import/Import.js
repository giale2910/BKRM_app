import React from 'react'
import {
    NativeBaseProvider,
    Button,
    Box,
    HamburgerIcon,
    Pressable,
    Heading,
    VStack,
    Text,
    Center,
    HStack,
    Divider,
    Icon,
    Container,
  } from "native-base";
  import { createNativeStackNavigator } from '@react-navigation/native-stack';

  import NavBar from "../../../../components/NavBar/NavBar"
import SearchScreen from "../../../SearchScreen/SearchScreen"
import BarCodeScreen from "../../../BarCodeScreen/BarCodeScreen"

import ImportScreen from "./ImportScreen/ImportScreen"
import AddInventory from "../Inventory/AddInventory/AddInventory"
const Stack = createNativeStackNavigator();

const Import= ({navigation}) => {
  return (
    <>
  <Stack.Navigator>  
      <Stack.Screen name="ImportScreen"  component={ImportScreen}  options={{ headerShown: false}} />  
      <Stack.Screen name="AddInventory"  component={AddInventory}  options={{ headerShown: false}} />   
      <Stack.Screen name="SearchScreen" component={SearchScreen}  options={{ headerShown: false, }} />
      <Stack.Screen name="BarCodeScreen" component={BarCodeScreen}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  </>
  )
}

export default Import


