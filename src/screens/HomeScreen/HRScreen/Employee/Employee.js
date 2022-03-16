import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EmployeeScreen from "./EmployeeScreen/EmployeeScreen"
import EmployeeDetailScreen from "./EmployeeDetailScreen/EmployeeDetailScreen"
import AddEmployee from "./AddEmployee/AddEmployee"


const Stack = createNativeStackNavigator();

const Supplier = ({navigation}) => {
  return (
    <Stack.Navigator>  
      <Stack.Screen name="EmployeeScreen"  component={EmployeeScreen}  options={{ headerShown: false}} />   
      <Stack.Screen name="EmployeeDetailScreen" component={EmployeeDetailScreen}  options={{ headerShown: false, }} />
      <Stack.Screen name="AddEmployee" component={AddEmployee}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  )
}

export default Supplier