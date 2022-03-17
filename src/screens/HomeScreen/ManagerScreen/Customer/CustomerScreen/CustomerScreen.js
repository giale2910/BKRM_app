import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

import {TouchableOpacity} from 'react-native';
import { VStack, Text, HStack, Divider,  Avatar ,IconButton,Button} from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";


//import project
import customerApi from "../../../../../api/customerApi";
import NavBar from "../../../../../components/NavBar/NavBar"
import SearchBar  from "../../../../../components/SearchBar/SearchBar"
import InfiniteFlatList from "../../../../../components/InfiniteFlatList/InfiniteFlatList"
import '../../../../../util/global'
import {PartnerTableRow} from "../../../../../components/TableRow/TableRow"


const CustomerScreen = ({navigation}) => {

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
            const response = await customerApi.getCustomers( store_uuid, { page: page,   limit: global.limitPerLoad});
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
            <PartnerTableRow  img={row.img_url}name={row.name } code={row.customer_code} phone={row.phone} score={"SCORE"}handleOnPress={()=> navigation.navigate("CustomerDetailScreen", { row: row})} uuid={row.uuid}/>
        );
      };
    

  return (
      <>
        <NavBar  navigation={navigation} title={"Khách hàng"} >
            {/* <Icon  name="add"  size={25}   onPress={() => navigation.navigate("AddCustomer", { isEdit: false })} />
            <Icon  name="swap-vert"  size={25} />
            <Icon  name="filter-alt" size={25} /> */}
            <IconButton size={"lg"} mt={-2.5} colorScheme='warmGray' variant={"ghost"} _icon={{ as: Icon ,  name: "add", size:7 }} onPress={() => navigation.navigate("AddCustomer", { isEdit: false })}/>
            <IconButton size={"lg"} mt={-2.5}ml={-5} colorScheme='warmGray' variant={"ghost"} _icon={{ as: Icon ,  name: "swap-vert", size:7 }} />
            <IconButton size={"lg"} mt={-2.5} ml={-5} colorScheme='warmGray' variant={"ghost"} _icon={{ as: Icon ,  name: "filter-alt", size:7 }} />
        </NavBar>  
        <SearchBar /> 
        <InfiniteFlatList data={customerList}  renderItem={renderItem} pagingState={pagingState} setPage={setPagingState} loadData={loadData} endList={endList} setEndList={setEndList}/> 
    </>
  )
}

export default CustomerScreen



