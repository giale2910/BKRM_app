import React , { useState, useEffect } from 'react'
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
// import BLEPrinterReceipt from "../../../../components/PrintReceipt/BLEPrinterReceipt"
// import NetPrinterReceipt from "../../../../components/PrintReceipt/NetPrinterReceipt"
// import USBPrinterReceipt from "../../../../components/PrintReceipt/USBPrinterReceipt"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../../store/slice/authSlice";

const Cart = ({navigation}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  useEffect(() => {
    if(!isLoggedIn){
      navigation.navigate("Login", { name: "Jane" });
    }
  }, [isLoggedIn]);


  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(authActions.logOut());
    // localStorage.removeItem("token");
    // sessionStorage.removeItem("BKRMprev");
    // sessionStorage.removeItem("BKRMopening");
  };

  return (
    <Center>
    <Text mt="12" fontSize={18}>
      This is Cart page.
      <Button  onPress={() =>  navigation.navigate('Login', { name: 'Jane' }) }>Login</Button>
      {/* <BLEPrinterReceipt /> */}
      {/* <NetPrinterReceipt /> */}
      <Button  onPress={() => logOutHandler()}>
                Logout
              </Button>
    </Text>
  </Center>
  )
}

export default Cart