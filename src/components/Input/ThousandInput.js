  
// import React from 'react';
// import NumberFormat from 'react-number-format';
// import { StyleSheet} from 'react-native'
// import { Input} from "native-base";

// export  default function ThousandInput({variant,isInvalid,value ,handleChange,handleBlur, errorMess,placeholder}) {
//   return (
//     <NumberFormat
//       value={value}
//       displayType='text'
//       thousandSeparator={true}
//       // suffix={' đ'}
     
//       renderText={formattedValue =>  
//       <Input
//         size="lg"
//         p={3}
//         placeholder={placeholder}
//         keyboardType="number-pad"
//         value={formattedValue}
//         onChangeText={handleChange}
//         isNumericString
//         />} 
//     />
//   );
// }


import React , { useState, useEffect } from 'react'
import { FormControl,Input, WarningOutlineIcon, Box,Text} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const ThousandInput = ({variant,isInvalid,value ,handleChange,handleBlur, errorMess,placeholder,keyboardType, isPwd}) => {
  const [show, setShow] = useState(false);

  console.log("value",Number(value).toLocaleString())
  return (
    <FormControl
        isInvalid={ isInvalid }
        >
        <Input
            textAlign="right"
            keyboardType="number-pad"
            variant={variant? variant:"outline"}
            size="lg"
            placeholder={placeholder}
            p={variant==="unstyled"?1:3}
            h={isPwd ?12:null}
            // value={(value).toLocaleString()}
            onChangeText={handleChange}
            onBlur={handleBlur}
            type={show || !isPwd ? "text" : "password"} 
            InputRightElement={isPwd?<Box pr={2} pt={5} ><MaterialIcons name={show ? "visibility" : "visibility-off"} size={20} mr="10" color="grey" onPress={() => setShow(!show)} /> </Box>:null} 
        />
        <Text>{Number(value).toLocaleString()}</Text>
        <FormControl.ErrorMessage
            leftIcon={<WarningOutlineIcon name="warning" size="xs" />}
        >
          {errorMess}
             
        </FormControl.ErrorMessage>
        </FormControl>
  )
}

export default ThousandInput