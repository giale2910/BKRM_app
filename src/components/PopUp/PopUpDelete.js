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
    AlertDialog
  } from "native-base";

const PopUpDelete = ({title, content,partnerName, handleDelete, isOpen, setIsOpen}) => {
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();



  return (
    <Center flex={1} >

    <AlertDialog motionPreset='fade' leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered >
      <AlertDialog.Content >
    
        <Center>
        <Text fontWeight={600} mt={5} fontSize={17} mb={1}>{title} </Text>
        <Text px={9} style={{textAlign:"center"}}>{content}  <Text bold>{partnerName}</Text>  ?</Text>
        </Center>
        <Divider mt={7} />
        <HStack justifyContent="center"  h={12}>
            <Button ref={cancelRef} onPress={onClose}size="lg" variant="ghost" colorScheme="blue"  w="50%"> Huỷ </Button> 
            <Divider orientation="vertical"/>
            <Button onPress={()=>handleDelete()} size="lg" variant="ghost"  colorScheme="danger"  w="50%"> Xoá </Button>
        </HStack>
       
      </AlertDialog.Content>
    </AlertDialog>
  </Center>
  )
}

export default PopUpDelete