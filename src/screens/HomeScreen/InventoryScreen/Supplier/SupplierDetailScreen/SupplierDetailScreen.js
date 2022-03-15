import React,{useEffect} from 'react'
import {  useSelector } from 'react-redux';


import { VStack,Text,HStack,Divider, Avatar } from "native-base";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

//import project
import supplierApi from '../../../../../api/supplierApi'
import BackNavBar from '../../../../../components/NavBar/BackNavBar';
import PopUpDelete from "../../../../../components/PopUp/PopUpDelete"
import {callPhone} from "../../../../../util/util"


const SupplierDetailScreen = ({navigation, route}) => {
  const [row, setRow] = React.useState(route.params.row);

  const info = useSelector(state => state.info)
  const store_uuid = info.store.uuid

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    if (route.params?.dataEdit) {
      setRow(route.params.dataEdit)
    }
  }, [route.params?.dataEdit]);



  const handleDeleteCustomer = async () => {
    // console.log(store_uuid, row.uuid);
    console.log("hello1")
    try {
      console.log("hello1")
      const response = await supplierApi.deleteSupplier(store_uuid, row.uuid);
      console.log("hello2")
      // // dispatch(statusAction.successfulStatus("Xóa thành công"));
      // alert("hello2")
      navigation.goBack();
    } catch (error) {
      console.log(error);
      // dispatch(statusAction.failedStatus("Xóa thất bại"));
    }
  };

  return (
    <>
    <BackNavBar navigation={navigation} title={"Chi tiết nhà cung cấp"} > 
          <MaterialCommunityIcons name="delete-forever-outline"  size={25}  color="#424242"  onPress={() => setIsOpen(!isOpen)} />
          <AntDesignIcon  name="edit"  size={25}  color="#424242"  onPress={() => navigation.navigate("AddSupplier", { isEdit: true , row:row})} />
    </BackNavBar>
    <Divider mt={-3} mb="6"/>
    <VStack mx={5} space={3}>

      <HStack  alignItems='center'>
        <Text w="40%" color='grey'>Mã nhà cung cấp</Text>
        <Text fontSize={16} >MÃ{row.supplier_code}</Text>
      </HStack> 
      <HStack>
        <Text w="40%" color='grey'>Tên nhà cung cấp</Text>
        <Text fontSize={16} >{row.name}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Số điện thoại</Text>
        <HStack space={2} onPress={()=>{callPhone(row.phone)}}>
            <FontAwesomeIcon style={{color:"#36afff"}} name="phone" size={15} />
            <Text style={{color:"#36afff"}}mt={-1} >{row.phone}</Text>
        </HStack>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Email</Text>
        <Text fontSize={16}  >{row.email}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Địa chỉ</Text>
        <Text fontSize={16}  >{row.address}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Thông tin thanh toán</Text>
        <Text fontSize={16}  >{row.payment_info}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Công ty</Text>
        <Text fontSize={16}  >{row.company}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Còn nợ</Text>
        <Text fontSize={16}  >TỔNG NỢ</Text>
      </HStack> 
    </VStack>



    

    {isOpen?<PopUpDelete title={"Xoá nhà cung cấp"} content="Bạn có chắc muốn xoá vĩnh viễn nhà cung cấp" partnerName={row.name} handleDelete={handleDeleteCustomer}isOpen={isOpen} setIsOpen={setIsOpen}/>:null}
    </>
  )
}

export default SupplierDetailScreen