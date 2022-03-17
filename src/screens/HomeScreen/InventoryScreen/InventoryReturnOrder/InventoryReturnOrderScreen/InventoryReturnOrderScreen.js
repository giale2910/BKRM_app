import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

import {TouchableOpacity} from 'react-native';
import { VStack, Text, HStack, Divider,  Avatar,IconButton } from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";


 //import project
import purchaseReturnApi from "../../../../../api/purchaseReturnApi";
import NavBar from "../../../../../components/NavBar/NavBar"
import SearchBar  from "../../../../../components/SearchBar/SearchBar"
import InfiniteFlatList from "../../../../../components/InfiniteFlatList/InfiniteFlatList"
import '../../../../../util/global'
import {BillTableRow} from "../../../../../components/TableRow/TableRow"
import PopUpSort from "../../../../../components/PopUp/PopUpSort"
import PopUpFilter from "../../../../../components/PopUp/PopUpFilter"


const InventoryReturnOrderScreen = ({navigation}) => {
    
    //supplier
    const [customerList, setCustomerList] = useState([]);

    const [endList, setEndList] = useState(false);
   

    const info = useSelector((state) => state.info);
    const store_uuid = info.store.uuid;
    const branch_uuid = info.branch.uuid;

    const [showModalSort, setShowModalSort] = useState(false);
    const [showModalFilter, setShowModalFilter] = useState(false);


    const initialQuery = {
        startDate: '',
        endDate: '',
        minTotalAmount: '',
        maxTotalAmount: '',
        status: '',
        paymentMethod: '',
        orderBy: 'purchase_returns.creation_date',
        sort: 'desc',
        searchKey: '',
    };

    const [query, setQuery] = useState(initialQuery)

    const [pagingState, setPagingState] = useState({ page: 0, loading: false });
  
    useEffect(() => {
        setPagingState({ ...pagingState, page:0 });
    }, [store_uuid, branch_uuid]);

    const loadData = async (page, isRefresh=false) => {
        try {
            const response = await purchaseReturnApi.getAllOfBranch( store_uuid,  branch_uuid,{ page: page,limit: global.limitPerLoad, ...query});
            if(response.data.data.length === 0 || response.data.data.length < global.limitPerLoad){setEndList(true)}
            if(isRefresh){
                setCustomerList(response.data.data); 
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
    }, [branch_uuid,query]);
    
   useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setPagingState({  page: 0 ,loading:false })
            loadData(0,true);
        });
        return unsubscribe;
    }, [navigation]);


    const handleRemoveFilter = () => {
        setQuery(initialQuery)
    }
   

 
    const renderItem = (row, index) => {
        return (
            <BillTableRow code={row.purchase_return_code} name={row.supplier_name} date={row.creation_date} totalCost={Number(row.total_amount)}  color='secondary.500' uuid={row.uuid} handleOnPress={()=> navigation.navigate("InventoryReturnOrderDetailScreen", { row: row})} />
        );
    };

  return (
      <>
        <NavBar  navigation={navigation} title={"Đơn trả hàng nhập"} >
            {/* <Icon  name="swap-vert"  size={25} onPress={() => setShowModalSort(true)}/>
            <Icon  name="filter-alt" size={25}  onPress={() => setShowModalFilter(true)}/> */}
            <IconButton size={"lg"} mt={-1}  colorScheme='warmGray' variant={"ghost"} _icon={{ as: Icon ,  name: "swap-vert", size:6 }} onPress={() => setShowModalSort(true)}/>
            <IconButton size={"lg"} mt={-1} ml={-5}mr={-2.5}  colorScheme='warmGray' variant={"ghost"} _icon={{ as: Icon ,  name: "filter-alt", size:6 }}onPress={() => setShowModalFilter(true)}/>

        </NavBar>  

        <SearchBar  searchKey={query.searchKey} setSearchKey={(value) => setQuery({...query, searchKey: value})}/> 
        <InfiniteFlatList data={customerList}  renderItem={renderItem} pagingState={pagingState} setPage={setPagingState} loadData={loadData} endList={endList} setEndList={setEndList}/> 

        {showModalSort? 
        <PopUpSort showModalSort={showModalSort}  setShowModalSort={setShowModalSort} 
            sort={query.sort} 
            setSort={(value) => setQuery({...query, sort:value})}
            orderBy={query.orderBy} 
            setOrderBy={(value) => setQuery({...query, orderBy: value})}
             orderByOptions={[
                {value: 'purchase_returns.creation_date', label: 'Ngày trả'},
                {value: 'total_amount', label: 'Tổng tiền trả'},
            ]}
            handleRemoveFilter={handleRemoveFilter}

        /> :null}
        {showModalFilter? 
        <PopUpFilter showModalFilter={showModalFilter}  setShowModalFilter={setShowModalFilter}
         query={query}  
         setQuery={setQuery}
         handleRemoveFilter={handleRemoveFilter}
         initialQuery={initialQuery}
         label={["Ngày trả:","Tiền trả:" ]}
         /> 
         :null}

    </>
  )
}

export default InventoryReturnOrderScreen



