import React from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import {
    NativeBaseProvider,
    Button,
    Box,
    HamburgerIcon,
    Pressable,
    Heading,
    VStack,
    Text,
    Center,
    HStack,
    Divider,
    Input,
    Stack,
    Container,
    IconButton,
    Menu
  } from "native-base";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ChangeCartBtn = (props) => {
    const {selectedIndex,cartList,handleChoose,handleDelete,handleAdd, isCart} =props;
    let hardText = isCart ? "Khách lẻ" :"Nhà cung cấp lẻ";

    const getTitle = (cart) => {
        if (isCart) {
            return cart.customer === null ? hardText : cart.customer.name
        } else {
            return cart.supplier === null ? hardText: cart.supplier.name
        }
    }


  return (
    <>
    {/* {cartList.length === 1 ?
              <Pressable  onPress={handleAdd}>
              <Icon name="add" size={25}/>
            </Pressable>
            : */}
            <Menu w="190" 
            trigger={triggerProps => {
                return <Pressable {...triggerProps} >
                  <Icon name="swap-vertical" size={25}/>
                </Pressable>;
            }}>
                {cartList.map((cart, index) => (
                        <Menu.Item
                             key={index}
                            style={{backgroundColor: index === selectedIndex ? "#edebeb":null}}
                            onPress={()=>handleChoose(index)}
                        >
                        <HStack alignItems="center" justifyContent="space-between">
                            <HStack  item xs={10}  >
                                <Box style={{marginRight:10}}><Text bold>#{index + 1}</Text></Box>
                                <Text>{getTitle(cart)} </Text>        
                            </HStack>
                            <Pressable onPress={()=>handleDelete(index )} >
                                <MaterialIcons name="cancel" size={15} color="#6e6d6d"/>
                            </Pressable>
                        </HStack>
                    </Menu.Item>
                ))}
            <Menu.Item onPress={handleAdd} ><HStack ><Text bold mr={6}>+</Text><Text bold>Tạo giỏ mới</Text></HStack></Menu.Item>
          </Menu>   
        {/* } */}
    </>
  )
}

export default ChangeCartBtn