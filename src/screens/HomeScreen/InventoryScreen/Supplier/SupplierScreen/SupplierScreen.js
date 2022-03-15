import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

import {TouchableOpacity} from 'react-native';
import { VStack, Text, HStack, Divider,  Avatar } from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";


 //import project
import supplierApi from "../../../../../api/supplierApi";
import NavBar from "../../../../../components/NavBar/NavBar"
import SearchBar  from "../../../../../components/SearchBar/SearchBar"
import InfiniteFlatList from "../../../../../components/InfiniteFlatList/InfiniteFlatList"
import '../../../../../util/global'


const SupplierScreen = ({navigation}) => {

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
            const response = await supplierApi.getSuppliers( store_uuid, { page: page,   limit: global.limitPerLoad});
            if(response.data.data.length === 0 || response.data.data.length < 30 ){setEndList(true)}
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
        console.log("row",row)
        return (
            <>
            <TouchableOpacity  key={row.uuid} onPress={() => navigation.navigate("SupplierDetailScreen", { row: row })}>
            <HStack justifyContent="space-between" >
                <HStack w="72%">
                    <VStack ml="3" justifyContent="space-between"  >
                        <Text fontSize={16} fontWeight={500} mb={3}>{row.name} </Text>
    
                        <HStack space={2}>
                            <FontAwesomeIcon name="phone" size={15}  color="grey"/>
                            <Text style={{color:"#36afff"}}mt={-1} >{row.phone}</Text>
                        </HStack>
                    </VStack>
                </HStack>
                <VStack justifyContent="space-between" alignItems="flex-end">
                         {/* Mã supplier */}
                        <Text fontSize={13} color="grey"> {row.supplier_code} </Text> 
                </VStack>
            </HStack>
           
            </TouchableOpacity>
             <Divider my="3"/>  
             </>

        );
      };
    

  return (
      <>
        <NavBar  navigation={navigation} title={"Nhà cung cấp"} >
            <Icon  name="add"  size={25}   onPress={() => navigation.navigate("AddSupplier", { isEdit: false })} />
            <Icon  name="swap-vert"  size={25} />
            <Icon  name="filter-alt" size={25} />
        </NavBar>  
        <SearchBar /> 
        <InfiniteFlatList data={customerList}  renderItem={renderItem} pagingState={pagingState} setPage={setPagingState} loadData={loadData} endList={endList} setEndList={setEndList}/> 
    </>
  )
}

export default SupplierScreen



