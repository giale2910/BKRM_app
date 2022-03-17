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
    IconButton
  } from "native-base";

  import Icon from "react-native-vector-icons/AntDesign";

const BackNavBar = (props) => {
  const {navigation, title, number} = props
  return (
    <>
        <HStack mt="9" ml="4" mb="9" mr="5" justifyContent="space-between" alignItems="center">
           <HStack>
           <IconButton m={-2} size={"lg"} colorScheme='warmGray' variant={"ghost"} _icon={{ as: Icon ,  name: "left", size:5 }}onPress={() => {navigation.goBack()}} />

           {/* <Icon name="left" color="black" size={20} onPress={() => {navigation.goBack()}}/> */}
            <Heading size="md" ml="5">{title}</Heading>
            {/* {number? <Heading color='primary.500' ml={2} size="md">{number + 1}</Heading>:null} */}
           
           </HStack>
            
            <HStack space={5} >
              {props.children}
            </HStack>
       </HStack>
   
       </>
  )
}

export default BackNavBar