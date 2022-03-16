import React, { useState } from "react";
import {HStack, Box,Text,Pressable} from 'native-base'
import DateTimePickerModal   from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/MaterialIcons";

const DatePicker = ({isDatePickerVisible,setDatePickerVisibility,label,formik,name, value}) => {

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    formik.setFieldValue(name, date);
    hideDatePicker();
  };

  
    const getFullDate = (date) => {
    if (date.length === 0) {return label}
    else{
      let formatDate = new Date(date)
      var day = formatDate.getDate()
      var month = formatDate.getMonth() > 8 ? formatDate.getMonth()+1: `0${formatDate.getMonth()+1}`
      var year = formatDate.getFullYear()
      return day + "/" + month + "/" + year
    }
   
  }
  
  return (
    <>
        {/* <Button title="Show Date Picker"  /> */}
        <Pressable onPress={showDatePicker}>
        <Box borderWidth="1"  borderColor="coolGray.200" borderRadius="5" h="12" justifyContent="center" px="2">
            <HStack  justifyContent="space-between">
                <Text color="gray.400"  fontSize={16}> {getFullDate(value)}</Text>
                <Icon  name="date-range"  size={25}  color="grey"  />    
            </HStack>
        </Box>
        </Pressable>
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
    </>
  );
};

export default DatePicker;