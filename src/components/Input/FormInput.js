import React , { useState, useEffect } from 'react'
import { FormControl,Input, WarningOutlineIcon, Box} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const FormInput = ({isInvalid,value ,handleChange,handleBlur, errorMess,placeholder,keyboardType, isPwd}) => {
  const [show, setShow] = useState(false);
  return (
    <FormControl
        isInvalid={ isInvalid }
        >
        <Input
            size="lg"
            placeholder={placeholder}
            p={3}
            h={isPwd ?12:null}
            keyboardType={keyboardType? keyboardType:"default"}
            value={value}
            onChangeText={handleChange}
            onBlur={handleBlur}
            type={show || !isPwd ? "text" : "password"} 
            InputRightElement={isPwd?<Box pr={2} pt={5} ><MaterialIcons name={show ? "visibility" : "visibility-off"} size={20} mr="10" color="grey" onPress={() => setShow(!show)} /> </Box>:null} 
        />
        <FormControl.ErrorMessage
            leftIcon={<WarningOutlineIcon name="warning" size="xs" />}
        >
          {errorMess}
             
        </FormControl.ErrorMessage>
        </FormControl>
  )
}

export default FormInput