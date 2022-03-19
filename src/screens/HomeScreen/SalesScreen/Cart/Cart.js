import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavBar from "../../../../components/NavBar/NavBar"
import SearchScreen from "../../../SearchScreen/SearchScreen"
import BarCodeScreen from "../../../BarCodeScreen/BarCodeScreen"

import CartScreen from "./CartScreen/CartScreen"
// import AddInventory from "../Inventory/AddInventory/AddInventory"
const Stack = createNativeStackNavigator();

const Cart= ({navigation}) => {
  return (
    <>
  <Stack.Navigator>  
      <Stack.Screen name="CartScreen"  component={CartScreen}  options={{ headerShown: false}} />  
      {/* <Stack.Screen name="AddInventory"  component={AddInventory}  options={{ headerShown: false}} />    */}
      <Stack.Screen name="SearchScreen" component={SearchScreen}  options={{ headerShown: false, }} />
      <Stack.Screen name="BarCodeScreen" component={BarCodeScreen}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  </>
  )
}

export default Cart


