import React,{useEffect} from 'react'
import {  useSelector } from 'react-redux';


import { VStack,Text,HStack,Divider, Avatar,Center, ScrollView } from "native-base";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";


import customerApi from '../../../../../api/customerApi'
import BackNavBar from '../../../../../components/NavBar/BackNavBar';
import PopUpDelete from "../../../../../components/PopUp/PopUpDelete"
import {callPhone} from "../../../../../util/util"


const CustomerDetailScreen = ({navigation, route}) => {
  // const {row} = route.params;
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
    try {
      const response = await customerApi.deleteCustomer(store_uuid, row.uuid);
      // dispatch(statusAction.successfulStatus("Xóa thành công"));
      // props.parentProps.onReload();
      onClose()
      navigation.goBack();
    } catch (error) {
      console.log(error);
      // dispatch(statusAction.failedStatus("Xóa thất bại"));
    }
  };

  return (
    <>
    <BackNavBar navigation={navigation} title={"Chi tiết khách hàng"} > 
          <MaterialCommunityIcons name="delete-forever-outline"  size={25}  color="#424242"  onPress={() => setIsOpen(!isOpen)} />
          <AntDesignIcon  name="edit"  size={25}  color="#424242"  onPress={() => navigation.navigate("AddCustomer", { isEdit: true , row:row})} />
    </BackNavBar>
    <Divider mt={-3} mb="3"/>
    <ScrollView >
    
    <VStack mx={5} space={3}>
      {/* <Avatar bg="primary.500"  mb="2"> {row.name[0].toUpperCase()} </Avatar> */}
      <Center  mb="6" mt={-2}>
      {row.img_url?<Avatar mt={4} size="xl" bg="primary.500" source={{uri: row.img_url }} > {row.name[0].toUpperCase()} </Avatar>
              : <Avatar mt={4}size="xl" bg="primary.500" > {row.name[0].toUpperCase()} </Avatar>
              // <Avatar bg="primary.500"w={55} h={55} source={ require("../../../../../assets/ava//ava6.png") }>  </Avatar>  
      } 
      </Center>  
      <HStack  alignItems='center'>
        <Text w="40%" color='grey'>Mã khách hàng :</Text>
        <Text fontSize={16} >{row.customer_code}</Text>
      </HStack> 
      <HStack>
        <Text w="40%" color='grey'>Tên khách hàng :</Text>
        <Text fontSize={16} >{row.name}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Số điện thoại :</Text>
        <HStack space={2} onPress={()=>{callPhone(row.phone)}}>
            <FontAwesomeIcon style={{color:"#36afff"}} name="phone" size={15} />
            <Text style={{color:"#36afff"}}mt={-1} >{row.phone}</Text>
        </HStack>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Email :</Text>
        <Text fontSize={16}  >{row.email}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Địa chỉ :</Text>
        <Text fontSize={16}  >{row.address}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Tích điểm :</Text>
        <Text fontSize={16}  >TÍCH ĐIỂM</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Thông tin thanh toán :</Text>
        <Text fontSize={16}  >{row.payment_info}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Còn nợ :</Text>
        <Text fontSize={16}  >TỔNG NỢ</Text>
      </HStack> 
    </VStack>
    </ScrollView>


    

    {isOpen?<PopUpDelete title={"Xoá khách hàng"} content="Bạn có chắc muốn xoá vĩnh viễn khách hàng" partnerName={row.name} handleDelete={handleDeleteCustomer}isOpen={isOpen} setIsOpen={setIsOpen}/>:null}
    </>
  )
}

export default CustomerDetailScreen