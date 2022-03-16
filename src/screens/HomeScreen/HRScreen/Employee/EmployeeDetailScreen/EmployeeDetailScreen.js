import React,{useEffect} from 'react'
import {  useSelector } from 'react-redux';


import { VStack,Text,HStack,Divider, Avatar,Box ,Center,Menu,Pressable, ScrollView} from "native-base";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

//import project
import employeeApi from '../../../../../api/employeeApi'
import BackNavBar from '../../../../../components/NavBar/BackNavBar';
import PopUpDelete from "../../../../../components/PopUp/PopUpDelete"
import {callPhone} from "../../../../../util/util"
import DotButton from "../../../../../components/Button/DotButton"

const EmployeeDetailScreen = ({navigation, route}) => {
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

  useEffect(() => {
    const fetchEmp = async () => {
      try {
        const response = await employeeApi.getEmployee(store_uuid, row.uuid);
        setRow(response.data.data);
      } catch (err) {
      }
    };
    fetchEmp();
  }, []);

  const salaryTypeMapping = {
    fix: "Lương cứng",
    "per-shift": "Lương theo ca",
  };

  const handleDeleteCustomer = async () => {
    try {
      const response = await employeeApi.deleteEmployee(store_uuid, row.uuid);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleActiveAndDeactiveCustomer = async () => {
    if (row.status === "inactive") {
      try {
        const response = await employeeApi.activeEmployee(store_uuid, row.uuid)
        setRow({...row, status:"avitve"})
        // dispatch(statusAction.successfulStatus("Kích hoạt thành công"))
      } catch (err) {
        console.log(err)
        // dispatch(statusAction.failedStatus("Kích hoạt thất bại"))
      }
    } else if (row.status === "active") {
      try {
        const response = await employeeApi.inactiveEmployee(store_uuid, row.uuid)
        setRow({...row, status:"inactive"})
        // dispatch(statusAction.successfulStatus("Ngưng hoạt động thành công"))
      } catch (err) {
        console.log(err)
        // dispatch(statusAction.failedStatus("Ngưng hoạt động thất bại"))
      }
    }
    
  };

  return (
    <>

    <BackNavBar navigation={navigation} title={"Chi tiết nhân viên"} > 
    
          <MaterialCommunityIcons name="delete-forever-outline"  size={25}  color="#424242"  onPress={() => setIsOpen(!isOpen)} />
          <AntDesignIcon  name="edit"  size={25}  color="#424242"  onPress={() => navigation.navigate("AddEmployee", { isEdit: true , row:row})} />
          <DotButton  status={row.status} handleActiveAndDeactiveCustomer={handleActiveAndDeactiveCustomer}/>
    
    </BackNavBar>
    <Divider mt={-3} mb="3"/>
    <ScrollView>
   
    <VStack mx={5} space={3}>
      <Center mb="4" mt={-2}>
      {row.img_url?<Avatar mt={4}size="xl" bg="primary.500" source={{uri: row.img_url }} > {row.name[0].toUpperCase()} </Avatar>
              : <Avatar mt={4} size="xl" bg="primary.500" > {row.name[0].toUpperCase()} </Avatar>
              // <Avatar bg="primary.500"w={55} h={55} source={ require("../../../../../assets/ava//ava6.png") }>  </Avatar>  
      }  
       </Center>
      <HStack  alignItems='center'>
        <Text w="40%" color='grey'>Mã nhân viên :</Text>
        <Text fontSize={16} >{row.employee_code}</Text>
      </HStack> 
      <HStack>
        <Text w="40%" color='grey'>Tên nhân viên :</Text>
        <Text fontSize={16} >{row.name}</Text>
      </HStack> 
      <HStack>
        <Text w="40%" color='grey'>Tên đăng nhập :</Text>
        <Text fontSize={16} >{row.user_name}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Số điện thoại : </Text>
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
        <Text w="40%"color='grey' >Ngày sinh :</Text>
        <Text fontSize={16}  >{row.date_of_birth}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >CMND</Text>
        <Text fontSize={16}  >{row.id_card_num}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Chức năng :</Text>
        <HStack space={1}> 
            {row.permissions?.map((permission, index) => ( <Box key={index}bg="lightgrey" px={2} py={1} borderRadius={112}><Text>{permission.description} </Text></Box> ))}
        </HStack>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Chi nhánh :</Text>
        {/* <Box minH={12}> */}
        <HStack space={1}> 
            {row.branches?.map((branch, index) => ( <Box key={index} bg="lightgrey" px={2} py={1} borderRadius={112}><Text>{branch.name} </Text></Box> ))}
        </HStack>
       {/* </Box> */}
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Loại lương :</Text>
        <Text fontSize={16}  > {salaryTypeMapping[row.salary_type]}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Mức lương :</Text>
        <Text fontSize={16}  > {row.salary}</Text>
      </HStack> 
      <HStack>
        <Text w="40%"color='grey' >Trạng thái :</Text>
        <Text fontSize={16}  > {row.status === "active"? "Kích hoạt":"Ngưng hoạt động" }</Text>
      </HStack> 
    </VStack>
    </ScrollView>


    

    {isOpen?<PopUpDelete title={"Xoá nhân viên"} content="Bạn có chắc muốn xoá vĩnh viễn nhân viên" partnerName={row.name} handleDelete={handleDeleteCustomer}isOpen={isOpen} setIsOpen={setIsOpen}/>:null}
    </>
  )
  
}

export default EmployeeDetailScreen