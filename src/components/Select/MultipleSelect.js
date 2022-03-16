import React from 'react';
import { Button, Actionsheet, useDisclose,Center,Text ,Divider,VStack,HStack,Stack,Container,Box,Pressable, PresenceTransition} from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";
import {TouchableOpacity} from "react-native"

const MultipleSelect =  ({isInvalid,value ,handleBlur, errorMess, label,options,formik, name}) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleConfirm = (selectedValueId) => {

    if(value.indexOf(selectedValueId) > -1  ){
      var newValue = [...value]
      newValue = newValue.filter(item => item !== selectedValueId)
      formik.setFieldValue(name, newValue);
    }
    else{
      var newValue = [...value]
      newValue.push(selectedValueId)
      formik.setFieldValue(name, newValue);
    }
  };

  const getArray = () => {
      
    return value.map((item) => {
        return options.find(
          (p) => p.id === item
        )?.name;
      }).join(", ")
    // return <Text> <HStack  justifyContent="flex-end" space={2}>{value.map((item, index) => {
    //   return (  
    //     <Box key={index} bg="lightgrey" px={2} py={1} borderRadius={12}><Text>{ options.find( (p) => p.id === item )?.name} </Text></Box>
    //   )
    // })    
    // }</HStack></Text>
}

  return (
    <>
      <Pressable onPress={onOpen}>
        <Box borderWidth="1"  borderColor="coolGray.200" borderRadius="5" minH={12} justifyContent="center" px="2" >
            <HStack  justifyContent="space-between" >
                <Text color={value.length === 0? "gray.400" : "black"}  fontSize={16}> {value.length === 0?label : getArray()}</Text>
                {/* {value.length === 0? <Text color={value.length === 0? "gray.400" : "black"}  fontSize={16}> {label}</Text> :
                getArray()
                } */}
                <Icon  name="keyboard-arrow-down"  size={25}  color="grey"  />    
            </HStack>
        </Box>
        </Pressable>

      <Actionsheet isOpen={isOpen} onClose={onClose} p={3}>
        
        <Actionsheet.Content borderBottomRadius={20}>
          { options.map((row) => {
            return (
              <>
              <Divider borderColor="gray.300" w="100%" />
              <Actionsheet.Item  onPress={()=>handleConfirm(row.id)}  bg={ value.indexOf(row.id) > -1 ?"blue.50":null}  style={{ display:'flex',alignItems:'center', justifyContent:'center'}}endIcon={value.indexOf(row.id) > -1  ?<Icon  name="check" size={20} /> :null} value={row}><Text fontSize={18} >{row.name}</Text></Actionsheet.Item>
             </>
            )
          }   
          )}
        </Actionsheet.Content >

        <Actionsheet.Footer mt={3} borderRadius={15}>
          <Actionsheet.Item onPress={onClose} > <Text mt={-6} mr="42%" ml="42%"fontSize={18}fontWeight="500" color="blue.500" >Cancel </Text></Actionsheet.Item>  
        </Actionsheet.Footer>
      
      </Actionsheet>
    </>
  );
}
export default MultipleSelect