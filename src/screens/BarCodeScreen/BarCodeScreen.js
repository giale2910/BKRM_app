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

import BackNavBar from "../../components/NavBar/BackNavBar"
const BarCodeScreen = ({navigation}) => {
  return (
      <>
    <BackNavBar navigation={navigation}/>
    <Text>Barcode</Text>
    {/* <Button  onPress={() =>  navigation.goBack() }>Search</Button> */}
</>
  )
}

export default BarCodeScreen