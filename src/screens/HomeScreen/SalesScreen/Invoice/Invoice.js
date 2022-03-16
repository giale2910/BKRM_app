import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoiceOrderScreen from "./InvoiceScreen/InvoiceScreen"
import InvoiceOrderDetailScreen from "./InvoiceDetailScreen/InvoiceDetailScreen"


const Stack = createNativeStackNavigator();

const Invoice = ({navigation}) => {
  return (
    <Stack.Navigator>  
      <Stack.Screen name="InvoiceOrderScreen"  component={InvoiceOrderScreen}  options={{ headerShown: false}} />   
      <Stack.Screen name="InvoiceOrderDetailScreen" component={InvoiceOrderDetailScreen}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  )
}

export default Invoice