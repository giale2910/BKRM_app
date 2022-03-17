import React from 'react'
import { VStack, Text, HStack, Divider,  Avatar,Image,Box } from "native-base";
import {TouchableOpacity,StyleSheet} from 'react-native';
import {formatDate} from '../../util/util'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export const BillTableRow = ({code, name, date, totalCost,color,uuid,handleOnPress }) => {
  return (
    <>
    <TouchableOpacity  key={uuid} onPress={handleOnPress}>
    <HStack justifyContent="space-between" >
        <HStack >
            <VStack justifyContent="space-between" space={2}>
                <Text fontSize={17} bold >{code} </Text>
                <Text fontSize={15} >{name}</Text>
            </VStack>
        </HStack>
        <VStack justifyContent="space-between" alignItems="flex-end" space={2}>
                <Text fontSize={13} color="grey"> {formatDate(date)} </Text> 
                <Text fontSize={13} color={color} bold fontWeight={700} fontSize={18}> {totalCost.toLocaleString()} </Text> 
        </VStack>
    </HStack>
    <Divider my="3"/>  
    </TouchableOpacity>
    
     </>
  )
}

export const PartnerTableRow = ({img, name, phone, code,score,isSupplier, uuid,handleOnPress}) => {
  const getImage = () => {
    if(isSupplier) return null
    if(img) return <Avatar bg="primary.500" source={{uri: img }} > {name[0].toUpperCase()} </Avatar>
    return <Avatar bg="primary.500" > {name?name[0].toUpperCase():null} </Avatar>
  }
  return (
    <>
    <TouchableOpacity  key={uuid} onPress={handleOnPress}>
    <HStack justifyContent="space-between" >
        <HStack w="72%">
          
          {getImage()}
          
            <VStack ml="3" justifyContent="space-between"  >
                <Text fontSize={16} fontWeight={500} mb={2}>{name} </Text>

                <HStack space={1}>
                    <FontAwesomeIcon name="phone" size={15}  color="grey"/>
                    <Text style={{color:"#36afff"}}mt={-1} >{phone}</Text>
                </HStack>
            </VStack>
        </HStack>
        <VStack justifyContent="space-between" alignItems="flex-end">
                <Text fontSize={13} color="grey">  {code} </Text>
                <Text  fontSize={17} bold mt="2" color="secondary.500">{score}</Text>
        </VStack>
    </HStack>
    <Divider my="3"/>  
    </TouchableOpacity>
    
     </>
  )
}

export const ProductTableRow = ({img,name,code,price,branch_quantity, handleOnPress, uuid}) => {
  return (
    <>
    <TouchableOpacity  key={uuid} onPress={handleOnPress} >
      <HStack justifyContent="space-between" >
          <HStack w="60%">
              <Image source={{ uri: img  }} alt={"name"}borderRadius="10" size="sm" />
              <VStack ml="3" justifyContent="space-between"  >
                  <Text fontSize={15} fontWeight={500}>{name} </Text>
                  <Text color='grey' mt="2">{code}</Text>
              </VStack>
          </HStack>
          <VStack justifyContent="space-between" alignItems="flex-end">
                  <Text fontSize={16} color='primary.500' fontWeight="700">  {price.toLocaleString()} </Text>    
                  <Text color='grey' mt="2">Tồn: {branch_quantity}</Text>
          </VStack>
      </HStack>
      <Divider my="3"/>  
      </TouchableOpacity>
     
     </>
  )
}


export const SummaryProductTableRow = ({item}) => {
  return (
    <Box  borderWidth="1"  borderColor="coolGray.300" borderRadius="5"   justifyContent="center" p="2" py="2" >
        <HStack  key={item.product_id}  justifyContent="space-between" >
          <VStack ml="3" justifyContent="space-between"  space={2} >
              <Text fontSize={16} fontWeight={500}>{item.name} </Text>
              {/* <Text color='grey' mt="2"> <Text color="blue.500" bold>({ item.quantity})</Text>  x  {item.unit_price.toLocaleString()} </Text> */}
              <VStack>
                <Text color='grey' >Số lượng: {item.quantity}</Text>
                <Text color='grey' >Đơn giá: {item.unit_price.toLocaleString()}</Text>
                {/* <Text color='grey' ml={-1}> #{item.product_code}</Text>
                <Text color='grey' >{item.unit_price.toLocaleString()} x  <Text color="blue.500" bold>({ item.quantity})</Text>  </Text> */}
              </VStack>
          </VStack>

          <VStack justifyContent="space-between" alignItems="flex-end" space={2} >
                <Text fontSize={16} bold fontWeight="600">  {(Number(item.quantity) * Number(item.unit_price)).toLocaleString()} </Text>    
                {item.returned_quantity?<Text color='red.500' fontWeight="500" ml={-3}>Đã trả: {item.returned_quantity}</Text>:null}
        </VStack>
        </HStack>
    </Box>  
  )
}



 

 