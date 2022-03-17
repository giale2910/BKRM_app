import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InventoryReturnOrderScreen from "./InventoryReturnOrderScreen/InventoryReturnOrderScreen"
import InventoryReturnOrderDetailScreen from "./InventoryReturnOrderDetailScreen/InventoryReturnOrderDetailScreen"


const Stack = createNativeStackNavigator();

const InventoryReturnOrder = ({navigation}) => {
  return (
    <Stack.Navigator>  
      <Stack.Screen name="InventoryReturnOrderScreen"  component={InventoryReturnOrderScreen}  options={{ headerShown: false}} />   
      <Stack.Screen name="InventoryReturnOrderDetailScreen" component={InventoryReturnOrderDetailScreen}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  )
}

export default InventoryReturnOrder