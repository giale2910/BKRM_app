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
import FormInput from "../../../components/Input/FormInput";
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
  // const [show, setShow] = useState(false);
  

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
        <FormInput 
            placeholder="Tên đăng nhập"
            isInvalid={loginFormik.touched.user_name && loginFormik.errors.user_name}
            value={loginFormik.values.user_name}
            handleChange={loginFormik.handleChange("user_name")}
            handleBlur={loginFormik.handleBlur("user_name")}
            errorMess={loginFormik.touched.user_name ? loginFormik.errors.user_name : null}
        />
          
          <FormInput 
            isPwd={true}
            placeholder="Mật khẩu"
            isInvalid={loginFormik.touched.password && loginFormik.errors.password}
            value={loginFormik.values.password}
            handleChange={loginFormik.handleChange("password")}
            handleBlur={loginFormik.handleBlur("password")}
            errorMess={loginFormik.touched.password ? loginFormik.errors.password : null}
        />
         
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

          }}
        >
          ĐĂNG NHẬP
        </Button>
      </Container>
    </Center>
  );
};

export default LoginScreen;



