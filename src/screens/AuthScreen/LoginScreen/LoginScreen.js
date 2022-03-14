import React, { useState, useEffect } from "react";
import { useColorMode, useColorModeValue } from "native-base";
import { useTheme } from "native-base";

// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInHandler, empLogInHandler } from "../../../store/actionCreator";
import { useFormik } from "formik";
import * as Yup from "yup";
import useStyle from "./styles";
// import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { verifyToken, setCustomization } from "../../../store/actionCreator";

import { View } from "react-native";
import userAPi from "../../../api/userApi";
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
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = useStyle(theme);
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customize);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const [path,setPath] = useState("/home")

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const [show, setShow] = useState(false);
  

  const [isOwner, setIsOwner] = useState(false);
  const loginFormik = useFormik({
    initialValues: {
      user_name: "",
      password: "",
    },
    validationSchema: Yup.object({
      user_name: Yup.string().required("Nhập tên đăng nhập"),
      password: Yup.string().required("Nhập mật khẩu"),
    }),
  });

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if(isLoggedIn){
      navigation.navigate("Home", { name: "Jane" });
    }
  }, []);
  useEffect(() => {
    if(isLoggedIn){
      navigation.navigate("Home", { name: "Jane" });
    }
  }, [isLoggedIn]);

  return (
    <Center flex={1} bg={`${theme.customization.primaryColor}.${100}`}>
      <Container
        h="93%"
        w="93%"
        style={{ justifyContent: "center", alignItems: "center" }}
        px={5}
      >
        <Circle size="40px" bg="secondary.500" mb={3}>
          <Icon name="lock" color="white" size={25} />
        </Circle>
        <Heading mb={2}>CỬA HÀNG CỦA BẠN</Heading>
        <Text fontSize="md" bold mb={8}>
          Đặng nhập
        </Text>
        {/*  */}
        <Stack space={6} w="100%" mb={5}>
          <FormControl
            isInvalid={
              loginFormik.touched.user_name && loginFormik.errors.user_name
            }
          >
            <Input
              size="lg"
              placeholder="Tên đăng nhập"
              p={3}
              value={loginFormik.values.user_name}
              onChangeText={loginFormik.handleChange("user_name")}
              onBlur={loginFormik.handleBlur("user_name")}
            />

            <FormControl.ErrorMessage
              leftIcon={<Icon name="warning" color="red" size={15} />}
            >
              {loginFormik.touched.user_name
                ? loginFormik.errors.user_name
                : null}{" "}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={
              loginFormik.touched.password && loginFormik.errors.password
            }
          >
            <Input
              size="lg"
              placeholder="Mật khẩu"
              p={3}
              value={loginFormik.values.password}
              onChangeText={loginFormik.handleChange("password")}
              onBlur={loginFormik.handleBlur("password")}
              type={show ? "text" : "password"} 
              h={12}
              InputRightElement={<Box pr={2} pt={5} ><MaterialIcons name={show ? "visibility" : "visibility-off"} size={20} mr="10" color="grey" onPress={() => setShow(!show)} /> </Box>} 
            />
          
            <FormControl.ErrorMessage
              leftIcon={<Icon name="warning" color="red" size={15} />}
            >
              {" "}
              {loginFormik.touched.password
                ? loginFormik.errors.password
                : null}{" "}
            </FormControl.ErrorMessage>
          </FormControl>
        </Stack>

        <Box style={{ alignSelf: "flex-end" }} mb={9}>
          <Checkbox
            value="danger"
            colorScheme="pink"
            style={{ alignSelf: "flex-end" }}
            checked={isOwner}
            onChange={(value) => setIsOwner(value)}
          >
            Chủ cửa hàng
          </Checkbox>
        </Box>
        <Button
          size="lg"
          style={{ width: "100%" }}
          isDisabled={
            !(
              loginFormik.isValid && Object.keys(loginFormik.touched).length > 0
            )
          }
          onPress={() => {
            if (isOwner) {
              dispatch(
                logInHandler(
                  loginFormik.values.user_name,
                  loginFormik.values.password
                )
              );
            } else {
              dispatch(
                empLogInHandler(
                  loginFormik.values.user_name,
                  loginFormik.values.password
                )
              );
            }
           
            console.log("hello")
          //   const signIn = async () => {
          //     try {
          //       const res = await userAPi.signIn({
          //         user_name: loginFormik.values.user_name,
          //         password: loginFormik.values.password,
          //         role: isOwner ? "owner" : "employee",
          //       });
          //       alert(JSON.stringify(res));
          //       // navigation.navigate("Home", { name: "Jane" });
          //       //console.log(res);
          //     } catch (err) {
          //       console.log(err);
          //     }
          //   };
          //   signIn();
          
          }}
        >
          ĐĂNG NHẬP
        </Button>
      </Container>
    </Center>
  );
};

export default LoginScreen;

// <Heading>xin chao</Heading>
//       <Text fontSize="lg" display="flex" mb="20">
//         The active color mode is{' '}
//         <Text bold fontSize="lg">
//           {colorMode}
//         </Text>
//       </Text>
//       <Button  bg={`blue.${colorKey}`} onPress={() =>  navigation.navigate('Home', { name: 'Jane' }) }>Login</Button>
//       <Button onPress={toggleColorMode}>Toggle</Button>



  

  //
  // const { colorMode, toggleColorMode} = useColorMode();
  // var colorKey=200;
  // colorScheme={`blue.${colorKey}`}
  // console.log("theme", theme )flex={1}

