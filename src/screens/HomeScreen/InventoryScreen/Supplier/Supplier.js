import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SupplierScreen from "./SupplierScreen/SupplierScreen"
import SupplierDetailScreen from "./SupplierDetailScreen/SupplierDetailScreen"
import AddSupplier from "./AddSupplier/AddSupplier"


const Stack = createNativeStackNavigator();

const Supplier = ({navigation}) => {
  return (
    <Stack.Navigator>  
      <Stack.Screen name="SupplierScreen"  component={SupplierScreen}  options={{ headerShown: false}} />   
      <Stack.Screen name="SupplierDetailScreen" component={SupplierDetailScreen}  options={{ headerShown: false, }} />
      <Stack.Screen name="AddSupplier" component={AddSupplier}  options={{ headerShown: false, }} />
  </Stack.Navigator>
  )
}

export default Supplier