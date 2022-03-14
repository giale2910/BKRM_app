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

  import Icon from "react-native-vector-icons/AntDesign";

const BackNavBar = (props) => {
  const {navigation, title} = props
  return (
        <HStack mt="9" ml="3" mb="5" space="3"justifyContent="flex-start" alignItems="center">
            <Icon name="left" color="black" size={20} onPress={() => {navigation.goBack()}}/>
            {props.children}
       </HStack>
  )
}

export default BackNavBar