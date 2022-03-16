import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

import {TouchableOpacity} from 'react-native';
import { VStack, Text, HStack, Divider,  Avatar } from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";


 //import project
import employeeApi from "../../../../../api/employeeApi";
import NavBar from "../../../../../components/NavBar/NavBar"
import SearchBar  from "../../../../../components/SearchBar/SearchBar"
import InfiniteFlatList from "../../../../../components/InfiniteFlatList/InfiniteFlatList"
import '../../../../../util/global'
import {PartnerTableRow} from "../../../../../components/TableRow/TableRow"


const EmployeeScreen = ({navigation}) => {

    //supplier
    const [customerList, setCustomerList] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [endList, setEndList] = useState(false);
   

    const info = useSelector((state) => state.info);
    const store_uuid = info.store.uuid;
    const branch_uuid = info.branch.uuid;
    const [pagingState, setPagingState] = useState({ page: 0, loading: false });

    useEffect(() => {
        setPagingState({ ...pagingState, page:0 });
    }, [store_uuid, branch_uuid]);

    const loadData = async (page, isRefresh=false) => {
        try {
            const response = await employeeApi.getEmployees( store_uuid, { page: page, limit: global.limitPerLoad});
            if(response.data.data.length === 0 || response.data.data.length < global.limitPerLoad ){setEndList(true)}
            if(isRefresh){
                setCustomerList(()=>response.data.data); 
                setPagingState({  page: 1 ,loading:false })
            }else{
 
                setCustomerList(customerList.concat(response.data.data));
                setPagingState({ ...pagingState, page: pagingState.page + 1 ,loading:false })
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (store_uuid && branch_uuid) {
            // loadData(pagingState.page,true);
            loadData(0,true);
        }
    }, [branch_uuid]);
    
   useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setPagingState({  page: 0 ,loading:false })
            loadData(0,true);
        });
        return unsubscribe;
    }, [navigation]);

 

    const renderItem = (row, index) => {
        return (
             <PartnerTableRow  img={row.img_url}name={row.name } code={row.employee_code} phone={row.phone} handleOnPress={()=>navigation.navigate("EmployeeDetailScreen", { row: row})} uuid={row.uuid}/>
        );
      };
    

  return (
      <>
        <NavBar  navigation={navigation} title={"Nhân viên"} >
            <Icon  name="add"  size={25}   onPress={() => navigation.navigate("AddEmployee", { isEdit: false })} />
            <Icon  name="swap-vert"  size={25} />
            <Icon  name="filter-alt" size={25} />
        </NavBar>  
        <SearchBar /> 
        <InfiniteFlatList data={customerList}  renderItem={renderItem} pagingState={pagingState} setPage={setPagingState} loadData={loadData} endList={endList} setEndList={setEndList}/> 
    </>
  )
}

export default EmployeeScreen



