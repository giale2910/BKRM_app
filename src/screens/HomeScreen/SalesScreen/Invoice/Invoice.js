import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoiceScreen from "./InvoiceScreen/InvoiceScreen"
import InvoiceDetailScreen from "./InvoiceDetailScreen/InvoiceDetailScreen"


const Stack = createNativeStackNavigator();

const Invoice = ({navigation}) => {
  return (
    <Stack.Navigator>  
      <Stack.Screen name="InvoiceScreen"  component={InvoiceScreen}  options={{ headerShown: false}} />   
      <Stack.Screen name="InvoiceDetailScreen" component={InvoiceDetailScreen}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  )
}

export default Invoice