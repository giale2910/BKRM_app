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
import BLEPrinterReceipt from "../../../../components/PrintReceipt/BLEPrinterReceipt"
// import NetPrinterReceipt from "../../../../components/PrintReceipt/NetPrinterReceipt"
// import USBPrinterReceipt from "../../../../components/PrintReceipt/USBPrinterReceipt"

const Cart = ({navigation}) => {
  return (
    <Center>
    <Text mt="12" fontSize="18">
      This is Cart page.
      <Button  onPress={() =>  navigation.navigate('Login', { name: 'Jane' }) }>Login</Button>
      <BLEPrinterReceipt />
      {/* <NetPrinterReceipt /> */}
    </Text>
  </Center>
  )
}

export default Cart