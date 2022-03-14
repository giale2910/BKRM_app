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
  } from "native-base";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InventoryScreen from "./InventoryScreen/InventoryScreen"
import InventoryDetailScreen from "./InventoryDetailScreen/InventoryDetailScreen"
import AddInventory from "./AddInventory/AddInventory"


const Stack = createNativeStackNavigator();

const Inventory = ({navigation}) => {
  return (
    <Stack.Navigator>  
      <Stack.Screen name="InventoryScreen"  component={InventoryScreen}  options={{ headerShown: false}} />   
      <Stack.Screen name="InventoryDetailScreen" component={InventoryDetailScreen}  options={{ headerShown: false, }} />
      <Stack.Screen name="AddInventory" component={AddInventory}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  )
}

export default Inventory