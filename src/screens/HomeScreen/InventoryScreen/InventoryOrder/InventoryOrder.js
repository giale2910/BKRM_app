import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InventoryOrderScreen from "./InventoryOrderScreen/InventoryOrderScreen"
import InventoryOrderDetailScreen from "./InventoryOrderDetailScreen/InventoryOrderDetailScreen"


const Stack = createNativeStackNavigator();

const InventoryOrder = ({navigation}) => {
  return (
    <Stack.Navigator>  
      <Stack.Screen name="InventoryOrderScreen"  component={InventoryOrderScreen}  options={{ headerShown: false}} />   
      <Stack.Screen name="InventoryOrderDetailScreen" component={InventoryOrderDetailScreen}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  )
}

export default InventoryOrder