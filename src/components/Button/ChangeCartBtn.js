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
import {TouchableOpacity} from 'react-native'
const ChangeCartBtn = (props) => {
    const {selectedIndex,cartList,handleChoose,handleDelete,handleAdd, isCart} =props;
    let hardText = isCart ? "Khách lẻ" :"Nhà cung cấp lẻ";

    // const getTitle = (cart) => {
    //     if (isCart) {
    //         return cart?.customer === null ? hardText : cart?.customer.name
    //     } else {
    //         return cart?.supplier === null ? hardText: cart?.supplier.name
    //     }
    // }


  return (
    <>
    {/* {cartList.length === 1 ?
              <Pressable  onPress={handleAdd}>
              <Icon name="add" size={25}/>
            </Pressable>
            : */}
            <Menu w="180" 
            placement="left top"
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
                                {/* <Text>{getTitle(cart)} </Text>         */}
                                <Text>Khách lẻ</Text>        
                            </HStack>
                            {/* <TouchableOpacity > */}
                              {/* <Button  onPress={()=>handleDelete(index)}> Hello</Button> */}
                                {/* <MaterialIcons name="cancel" size={15} color="#6e6d6d"/> */}
                            {/* </TouchableOpacity> */}
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