import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoiceReturnScreen from "./InvoiceReturnScreen/InvoiceReturnScreen"
import InvoiceReturnDetailScreen from "./InvoiceReturnDetailScreen/InvoiceReturnDetailScreen"


const Stack = createNativeStackNavigator();

const InvoiceReturn = ({navigation}) => {
  return (
    <Stack.Navigator>  
      <Stack.Screen name="InvoiceReturnScreen"  component={InvoiceReturnScreen}  options={{ headerShown: false}} />   
      <Stack.Screen name="InvoiceReturnDetailScreen" component={InvoiceReturnDetailScreen}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  )
}

export default InvoiceReturn