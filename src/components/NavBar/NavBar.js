import React from 'react'
import {
    Button,
    Box,
    Container,
    Pressable,
    Heading,
    Checkbox,
    FormControl,
    VStack,
    Text,
    Stack,
    Input,
    Circle,
    Center,
    HStack,
    Divider,
  } from "native-base";

  import Icon from "react-native-vector-icons/MaterialIcons";
  import { useTheme } from "native-base";
  import ChangeCartBtn from "../Button/ChangeCartBtn"

const NavBar = (props) => {
const {navigation, title,number} = props;
  const theme = useTheme();
  const color = "primary.500"
  return (
        <HStack  m="6" ml="4"mt="9"mspacing="5"justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
                <Icon name="menu" color="black" size={25} onPress={() => {navigation.openDrawer()}}/>
                <Heading ml="4" mr="2">{title}</Heading>
                {number? <Heading color='primary.500'  mr={20}># {number + 1}</Heading>:null}
            </HStack>
            <HStack space={2}>
              {props.children}
            </HStack>
       </HStack>
  )
}

export default NavBar