import React from 'react'
import {HStack,Box,VStack} from 'native-base'
import ThousandInput from "../Input/ThousandInput"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IoniconsIcons from "react-native-vector-icons/Ionicons";


import EntypoIcons from "react-native-vector-icons/Entypo";
import { Pressable } from 'native-base';

const ButtonQuantity = ({quantity,setQuantity, limit, isReturn,branch_quantity, uuid,}) => {

    const handleIncrement = () => {
        //them cai nay
            if (Number(limit) === 0){
            setQuantity(quantity)
            return
        }

        else if(limit) {
            if(quantity >= Number(limit)) {
            console.log('true')
            setQuantity(quantity)
            return
            } 
        } 
    setQuantity(quantity+ 1);
    };

    const handleDecrement = () => {
        if(quantity >=1){setQuantity(quantity- 1);}
    };

    var error_quantity = quantity > branch_quantity;

    const handleQuantity = (e) =>{
       if (!isNaN(e.target.value) && e.target.value >0){
        setQuantity(parseInt(e.target.value))
      } 
    }

      
  return (

    <HStack alignItems='center' mb={-3} mr={-3}>
        {error_quantity?<IoniconsIcons name="warning"color='red' size={20}/>:null}
        <Pressable onPress={()=>{handleDecrement(); console.log("press")}}><Box w={10} alignItems='center' > <EntypoIcons name="minus" size={20} color={ error_quantity  ? "red":'grey'}/> </Box></Pressable>
        <VStack  w={55}>
        <ThousandInput 
            error_quantity={error_quantity}
            variant="outline"
            textAlign="center" 
            value={quantity.toString()} 
            handleChange={handleQuantity}  
            
        />
        </VStack>
        {isReturn ? `/${limit}`: null}
        <Pressable onPress={handleIncrement} ><Box w={10} mt={4} alignItems='center' >< MaterialIcons name="add" size={20} color={ error_quantity  ? "red":'grey'}/> </Box></Pressable>
    </HStack>
  )
}

export default ButtonQuantity