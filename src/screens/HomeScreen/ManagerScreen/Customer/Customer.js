import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomerScreen from "./CustomerScreen/CustomerScreen"
import CustomerDetailScreen from "./CustomerDetailScreen/CustomerDetailScreen"
import AddCustomer from "./AddCustomer/AddCustomer"


const Stack = createNativeStackNavigator();

const Customer = ({navigation}) => {
  return (
    <Stack.Navigator>  
      <Stack.Screen name="CustomerScreen"  component={CustomerScreen}  options={{ headerShown: false}} />   
      <Stack.Screen name="CustomerDetailScreen" component={CustomerDetailScreen}  options={{ headerShown: false, }} />
      <Stack.Screen name="AddCustomer" component={AddCustomer}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  )
}

export default Customer