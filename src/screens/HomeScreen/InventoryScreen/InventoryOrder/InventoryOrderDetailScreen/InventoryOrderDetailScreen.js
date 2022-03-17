import React,{useEffect,useState} from 'react'
import {  useSelector } from 'react-redux';


import { VStack,Text,HStack,Divider,Heading, Avatar,Center,Box, ScrollView,Button } from "native-base";
import {StyleSheet} from 'react-native'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

//import project
import purchaseOrderApi from '../../../../../api/purchaseOrderApi'
import BackNavBar from '../../../../../components/NavBar/BackNavBar';
import {callPhone} from "../../../../../util/util"
import {formatDate, calculateTotalQuantity} from "../../../../../util/util"
import {SummaryProductTableRow} from "../../../../../components/TableRow/TableRow"
import {TouchableOpacity,View } from 'react-native'
import PopUpPayRemaining from '../../../../../components/PopUp/PopUpPayRemaining';
const InventoryOrderDetailScreen = ({navigation, route}) => {
  const [row, setRow] = React.useState(route.params.row);

  const info = useSelector(state => state.info)
  const store_uuid = info.store.uuid

  const [reload, setReload] = useState(false);
  const debtAmount =
    Number(row.total_amount) - Number(row.discount) - Number(row.paid_amount);



  const loadData = async () => {
    try {
      const res = await purchaseOrderApi.getPurchaseOrder( store_uuid, row.uuid );
      // setRow(res.data);
      setRow(res.data.data);
    } catch (error) {
      setRow({ branch: null,  details: [], });
    }
  };

  useEffect(() => {
      loadData();
    }, []);
    useEffect(() => {
      loadData();
    }, [reload]);
    



  const [openPayRemaining, setOpenPayRemaining] = useState(false);
  const editInventoryOrderApiCall = async ( store_uuid, branch_uuid,  uuid,  body ) => {
    return purchaseOrderApi.editPurchaseOrder( store_uuid, branch_uuid,uuid,  body );};


  return (
   
   <>
    <BackNavBar navigation={navigation} title={"Chi tiết đơn nhập hàng"}  > 
        {/*  */}
        {/* <Button p={1} variant="Subtle"size={"md"}colorScheme='blue'>Trả hàng</Button> */}
        <Button size="md" borderRadius={20} px={3} py={1.5} my={-1}colorScheme="blue" mt={-2} 
            onPress={()=>{navigation.navigate("",{data:row})}}>
            Trả hàng
          </Button>
    </BackNavBar>
    <Divider mt={-3} mb="6"/>
     <ScrollView>
    
    <Center >
      <Heading size="xl" mb={5}>{(row.total_amount - row.discount).toLocaleString()} </Heading>
      </Center >
      <VStack mx={5} space={2.5}>
      {/* <Box  borderWidth="1"  borderColor="coolGray.200" borderRadius="5"   justifyContent="center" >

    <VStack  space={3} m={4}>
     */}
      <HStack  alignItems='center'>
        <Text bold w="50%" color='black'>Mã đơn nhập : </Text>
        <Text fontSize={16} >{row.purchase_order_code}</Text>
      </HStack> 
      <HStack>
        <Text bold w="50%" color='black'>Ngày bán : </Text>
        <Text fontSize={16} >{formatDate(row.creation_date)}</Text>
      </HStack> 
      <HStack>
        <Text bold w="50%"color='black' >Nhà cung cấp : </Text>
        <Text fontSize={16} >{row.supplier_name}</Text>
      </HStack> 
      <HStack>
        <Text bold w="50%"color='black' >Người nhập : </Text>
        <Text fontSize={16}  >{ row.created_by_user ? row.created_by_user.name  : ""}{" "}</Text>
      </HStack> 
      {/* <HStack>
        <Text w="50%"color='black' >Tổng tiền nhập :</Text>
        <Text fontSize={16}  >{row.total_amount -row.discount}</Text>
      </HStack>  */}
      <HStack>
        <Text bold w="50%"color='black' >Chi nhánh thực hiện :</Text>
        <Text fontSize={16}  >{row.branch ? row.branch.name : ""}</Text>
      </HStack> 

      <HStack>
        <Text bold w="50%"color='black' >Trạng thái :</Text>
        <Text fontSize={16} mr={2} >{debtAmount >  0 ?"Còn nợ" :"Trả đủ"}  {debtAmount >  0 ?debtAmount.toLocaleString() :null } </Text>
        {debtAmount >  0 ?<Button size="sm"  colorScheme='blue'mt={-2} onPress={() => setOpenPayRemaining(true)}>Trả tiếp </Button>:null}
      </HStack> 

      <PopUpPayRemaining 
          reloadDetail={() => setReload(!reload)}
          uuid={row.uuid}
          debt={debtAmount}
          paid={Number(row.paid_amount)}
          title={`Trả nợ đơn nhập hàng ${row.purchase_order_code}` }
          open={openPayRemaining}
          handleClose={() => setOpenPayRemaining(false)}
          editApiCall={editInventoryOrderApiCall}
          
      />
      <HStack>
        <Text bold w="50%"color='black' >Phương thức thanh toán :</Text>
        <Text fontSize={16}  >{row.payment_method === "cash" ? "Tiền mặt" : "Thẻ"}</Text>
      </HStack> 
      {/* </VStack>
      </Box> */}
      <Heading size="md" mt={6} mb={2}>Sản phẩm </Heading>

      {row.details?.map((item) => (
        <SummaryProductTableRow  item={item}/>
      ))}

      <Box bg='blueGray.200' px={5} mt={3} mb={6}py={3}borderRadius={20} alignItems="flex-end" >
          <HStack  alignItems='center'>
            <Text w="50%" color='black'>Tổng SL sản phẩm ({row.details?.length.toLocaleString()}) :</Text>
            <Text  w="30%" fontSize={16} >{row.details?calculateTotalQuantity(row.details) : null}</Text>
          </HStack>
          <HStack  alignItems='center'>
            <Text w="50%" color='black'>Tổng tiền hàng : </Text>
            <Text w="30%"fontSize={16} >{row.total_amount?.toLocaleString()}</Text>
          </HStack>
          <HStack  alignItems='center'>
            <Text w="50%" color='black'>Giảm giá : </Text>
            <Text w="30%" fontSize={16} >{row.discount?.toLocaleString()}</Text>
          </HStack>
          <HStack  alignItems='center'>
            <Text w="50%" color='black' bold>Tổng tiền nhập : </Text>
            <Text w="30%" bold fontSize={16} >{(row.total_amount - row.discount).toLocaleString()}</Text>
          </HStack>
          <HStack  alignItems='center'>
            <Text w="50%" color='black'>Đã trả NCC : </Text>
            <Text w="30%"  fontSize={16} >{row.paid_amount.toLocaleString()}</Text>
          </HStack>
      </Box>

    </VStack>

    
    </ScrollView>
    </>
  )
}

export default InventoryOrderDetailScreen

const styles = StyleSheet.create({

  container:{
    // boxShadow: "5px 10px #888888"
     
    },
  })