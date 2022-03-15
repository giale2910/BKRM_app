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
    Container,
  } from "native-base";
import BackNavBar from '../../../../../components/NavBar/BackNavBar';
const AddInventory = ({navigation}) => {
  return (
    <BackNavBar navigation={navigation} title={"Thêm sản phẩm"} />
  )
}

export default AddInventory