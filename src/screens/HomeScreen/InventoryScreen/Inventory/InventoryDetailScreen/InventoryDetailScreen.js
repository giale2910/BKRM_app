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

const InventoryDetailScreen = ({navigation}) => {
  return (
    <>
        <BackNavBar navigation={navigation} title={"Thêm sản phẩm"} />

    <Text>InventoryDetailScreen</Text>
    </>
  )
}

export default InventoryDetailScreen