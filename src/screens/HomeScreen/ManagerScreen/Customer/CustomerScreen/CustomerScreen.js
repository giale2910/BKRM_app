import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

import {TouchableOpacity} from 'react-native';
import { VStack, Text, HStack, Divider,  Avatar } from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";


//import project
import customerApi from "../../../../../api/customerApi";
import NavBar from "../../../../../components/NavBar/NavBar"
import SearchBar  from "../../../../../components/SearchBar/SearchBar"
import InfiniteFlatList from "../../../../../components/InfiniteFlatList/InfiniteFlatList"
import '../../../../../util/global'


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
            if(response.data.data.length === 0 || response.data.data.length < 10 ){setEndList(true)}
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
            <>
     
            <TouchableOpacity  key={row.uuid} onPress={() => navigation.navigate("CustomerDetailScreen", { row: row })}>
            <HStack justifyContent="space-between" >
                <HStack w="72%">
                   {row.img_url?<Avatar bg="primary.500" source={{uri: row.img_url }} > {row.name[0].toUpperCase()} </Avatar>
                        : <Avatar bg="primary.500" > {row.name[0].toUpperCase()} </Avatar>
                        // <Avatar bg="primary.500"w={55} h={55} source={ require("../../../../../assets/ava//ava6.png") }>  </Avatar>  
                    }   
                    <VStack ml="3" justifyContent="space-between"  >
                        <Text fontSize={16} fontWeight={500} mb={2}>{row.name} </Text>
    
                        <HStack space={1}>
                            <FontAwesomeIcon name="phone" size={15}  color="grey"/>
                            <Text style={{color:"#36afff"}}mt={-1} >{row.phone}</Text>
                        </HStack>
                    </VStack>
                </HStack>
                <VStack justifyContent="space-between" alignItems="flex-end">
                        <Text fontSize={13} color="grey">  {row.customer_code} </Text>
                        <Text  fontSize={17} bold mt="2" color="secondary.500">score nếu có{row.customer_score}</Text>
                </VStack>
            </HStack>
           
            </TouchableOpacity>
             <Divider my="3"/>  
             </>

        );
      };
    

  return (
      <>
        <NavBar  navigation={navigation} title={"Khách hàng"} >
            <Icon  name="add"  size={25}   onPress={() => navigation.navigate("AddCustomer", { isEdit: false })} />
            <Icon  name="swap-vert"  size={25} />
            <Icon  name="filter-alt" size={25} />
        </NavBar>  
        <SearchBar /> 
        <InfiniteFlatList data={customerList}  renderItem={renderItem} pagingState={pagingState} setPage={setPagingState} loadData={loadData} endList={endList} setEndList={setEndList}/> 
    </>
  )
}

export default CustomerScreen



