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
import { verifyToken, setCustomization } from "../../../store/actionCreator";

import { View } from "react-native";

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
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const [path,setPath] = useState("/home")

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

  //
  // const { colorMode, toggleColorMode} = useColorMode();
  // var colorKey=200;
  // colorScheme={`blue.${colorKey}`}
  // console.log("theme", theme )flex={1}

  console.log("loginFormik.values", loginFormik.values);
  useEffect(() => {
    dispatch(verifyToken());
    dispatch(setCustomization(customization));
    // setPath(sessionStorage.getItem("BKRMprev"))
  }, [dispatch]);
  console.log("isOwner", isOwner);
  return (
    <Center flex={1} bg={`${theme.customization.primaryColor}.${100}`}>
      <Container
        h="96%"
        w="95%"
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
            console.log("isLoggedIn", isLoggedIn);

            if (isLoggedIn) {
              navigation.navigate("Home", { name: "Jane" });
            }
            navigation.navigate("Home", { name: "Jane" });
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
