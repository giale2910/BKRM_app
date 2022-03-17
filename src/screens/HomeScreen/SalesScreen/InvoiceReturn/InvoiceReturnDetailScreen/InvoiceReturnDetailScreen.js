import React,{useEffect,useState} from 'react'
import {  useSelector } from 'react-redux';


import { VStack,Text,HStack,Divider,Heading, Avatar,Center,Box, ScrollView } from "native-base";
import {StyleSheet} from 'react-native'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

//import project
import refundApi from '../../../../../api/refundApi'
import BackNavBar from '../../../../../components/NavBar/BackNavBar';
import {callPhone} from "../../../../../util/util"
import {formatDate, calculateTotalQuantity} from "../../../../../util/util"
import {SummaryProductTableRow} from "../../../../../components/TableRow/TableRow"
import {TouchableOpacity,View } from 'react-native'

const InvoiceReturnDetailScreen = ({navigation, route}) => {
  const [row, setRow] = React.useState(route.params.row);

  const info = useSelector(state => state.info)
  const store_uuid = info.store.uuid


  const loadData = async () => {
    try {
      const res = await refundApi.getRefund( store_uuid, row.uuid );
      // setRow(res.data);
      setRow(res.data.data);
    } catch (error) {
      setRow({ branch: null,  details: [], });
    }
  };

  useEffect(() => {
      loadData();
    }, []);


  return (
   
   <>
    <BackNavBar navigation={navigation} title={"Chi tiết đơn trả"} > 
        {/*  */}
    </BackNavBar>
    <Divider mt={-3} mb="6"/>
     <ScrollView>
    
    <Center >
      <Heading size="xl" mb={5}>{Number(row.total_amount).toLocaleString()} </Heading>
      </Center >
      <VStack mx={5} space={2.5}>
      {/* <Box  borderWidth="1"  borderColor="coolGray.200" borderRadius="5"   justifyContent="center" >

    <VStack  space={3} m={4}>
     */}
      <HStack  alignItems='center'>
        <Text bold w="50%" color='black'>Mã đơn trả : </Text>
        <Text fontSize={16} >{row.refund_code}</Text>
      </HStack> 
      <HStack  alignItems='center'>
        <Text bold w="50%" color='black'>Mã hoá đơn : </Text>
        <Text fontSize={16} >{row.order?.order_code}</Text>
      </HStack> 
      <HStack>
        <Text bold w="50%" color='black'>Ngày trả : </Text>
        <Text fontSize={16} >{formatDate(row.created_at)}</Text>
      </HStack> 
      <HStack>
        <Text bold w="50%"color='black' >Khách hàng : </Text>
        <Text fontSize={16} >{row.customer?.name}</Text>
      </HStack> 
      <HStack>
        <Text bold w="50%"color='black' >Người thực hiện : </Text>
        <Text fontSize={16}  >{ row.created_by_user ? row.created_by_user.name  : ""}{" "}</Text>
      </HStack> 
      {/* <HStack>
        <Text w="50%"color='black' >Tổng tiền nhập :</Text>
        <Text fontSize={16}  >{row.total_amount}</Text>
      </HStack>  */}
      <HStack>
        <Text bold w="50%"color='black' >Chi nhánh thực hiện :</Text>
        <Text fontSize={16}  >{row.branch ? row.branch.name : ""}</Text>
      </HStack> 

      {/* <HStack>
        <Text bold w="50%"color='black' >Trạng thái :</Text>
        <Text fontSize={16}  >{debtAmount >  0 ?"Còn nợ " :"Trả đủ"}  {debtAmount >  0 ?<VNDFormat value={debtAmount} />  :null } </Text>
      </HStack>  */}
      <HStack>
        <Text bold w="50%"color='black' >Phương thức thanh toán :</Text>
        <Text fontSize={16}  >{row.payment_method === "cash" ? "Tiền mặt" : "Thẻ"}</Text>
      </HStack> 
      {/* </VStack>
      </Box> */}
      <Heading size="md" mt={6} mb={2}>Sản phẩm</Heading>

      {row.details?.map((item) => (
        <SummaryProductTableRow  item={item}/>
      ))}

      <Box bg='blueGray.200' px={5} mt={3} mb={6}py={3}borderRadius={20} alignItems="flex-end" >
          <HStack  alignItems='center'>
            <Text w="50%" color='black'>Tổng SL sản phẩm ({row.details?.length.toLocaleString()}) :</Text>
            <Text  w="30%" fontSize={16} >{row.details?calculateTotalQuantity(row.details) : null}</Text>
          </HStack>
          <HStack  alignItems='center'>
            <Text w="50%"bold color='black'>Tổng tiền trả : </Text>
            <Text w="30%" bold fontSize={16} >{Number(row.total_amount).toLocaleString()}</Text>
          </HStack>
          
          {/* <HStack  alignItems='center'>
            <Text w="50%" color='black'>Đã trả khách : </Text>
            <Text w="30%"  fontSize={16} >{row.paid_amount.toLocaleString()}</Text>
          </HStack> */}
      </Box>

    </VStack>

    
    </ScrollView>
    </>
  )
}

export default InvoiceReturnDetailScreen

const styles = StyleSheet.create({

  container:{
    // boxShadow: "5px 10px #888888"
     
    },
  })