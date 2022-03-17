  
import React from 'react';
import NumberFormat from 'react-number-format';
import { StyleSheet} from 'react-native'
import { Input} from "native-base";

export  default function ThousandInput({variant,isInvalid,value ,handleChange,handleBlur, errorMess,placeholder}) {
  return (
    <NumberFormat
      value={value}
      displayType='text'
      thousandSeparator={true}
      // suffix={' đ'}
     
      renderText={formattedValue =>  
      <Input
        size="lg"
        p={3}
        placeholder={placeholder}
        keyboardType="number-pad"
        value={formattedValue}
        onChangeText={handleChange}
        isNumericString
        />} 
    />
  );
}