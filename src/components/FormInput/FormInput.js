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
  import Icon from "react-native-vector-icons/FontAwesome";

const FormInput = ({isInvalid,value ,handleChange,handleBlur, errorMess,placeholder,keyboardType}) => {
  return (
    <FormControl
        isInvalid={
            // loginFormik.touched.user_name && loginFormik.errors.user_name
            isInvalid
        }
        >
        <Input
            size="lg"
            placeholder={placeholder}
            p={3}
            type={"numeric"}
            // value={loginFormik.values.user_name}
            // onChangeText={loginFormik.handleChange("user_name")}
            // onBlur={loginFormik.handleBlur("user_name")}
            keyboardType={keyboardType? keyboardType:"default"}
            value={value}
            onChangeText={handleChange}
            onBlur={handleBlur}
        />

        <FormControl.ErrorMessage
            leftIcon={<Icon name="warning" color="red" size={15} />}
            // mb={3}
        >
                {errorMess}
                {/* {loginFormik.touched.user_name
          ? loginFormik.errors.user_name
          : null}{" "} */}
        </FormControl.ErrorMessage>
        </FormControl>
  )
}

export default FormInput