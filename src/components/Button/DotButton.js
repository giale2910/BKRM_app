import React from 'react'
import { Text,HStack,Menu,Pressable} from "native-base";
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";

const DotButton = ({status,handleActiveAndDeactiveCustomer}) => {
  return (
    <Menu w="180" placement="bottom right" trigger={triggerProps => {
        return <Pressable  {...triggerProps}> 
        <MaterialCommunityIcons name="dots-vertical" size={25} /> 
        </Pressable>  
        }}>
        <Menu.Item onPress={handleActiveAndDeactiveCustomer} >
          <HStack space={3}>
            <MaterialCommunityIcons name="account-cancel" size={20} />
            <Text>{status === "active" ? "Ngưng hoạt động" :"Kích hoạt"}</Text>
          </HStack>
        </Menu.Item>
        </Menu>
  )
}

export default DotButton