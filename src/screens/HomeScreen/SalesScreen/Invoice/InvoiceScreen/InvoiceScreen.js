import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

import {TouchableOpacity} from 'react-native';
import { VStack, Text, HStack, Divider,  Avatar ,IconButton} from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";


 //import project
import orderApi from "../../../../../api/orderApi";
import NavBar from "../../../../../components/NavBar/NavBar"
import SearchBar  from "../../../../../components/SearchBar/SearchBar"
import InfiniteFlatList from "../../../../../components/InfiniteFlatList/InfiniteFlatList"
import '../../../../../util/global'
import {BillTableRow} from "../../../../../components/TableRow/TableRow"
import PopUpSort from "../../../../../components/PopUp/PopUpSort"
import PopUpFilter from "../../../../../components/PopUp/PopUpFilter"


const InvoiceScreen = ({navigation}) => {
    

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
        minDiscount: '',
        maxDiscount: '',
        minTotalAmount: '',
        maxTotalAmount: '',
        // minDiscount: 0,
        // maxDiscount: 0,
        // minTotalAmount: 0,
        // maxTotalAmount: 0,
        status: '',
        paymentMethod: '',
        orderBy: 'orders.created_at',
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
            const response = await orderApi.getAllOfBranch( store_uuid,  branch_uuid,{ page: page,limit: global.limitPerLoad, ...query});
            if(response.data.data.length === 0 || response.data.data.length < global.limitPerLoad ){setEndList(true)}
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
        <BillTableRow code={row.order_code} name={row.customer_name} date={row.paid_date} totalCost={row.total_amount -row.discount}  color='primary.500' uuid={row.uuid} handleOnPress={()=> navigation.navigate("InvoiceDetailScreen", { row: row})} />
        );
    };

  return (
      <>
        <NavBar  navigation={navigation} title={"Hoá đơn"} >
            {/* <Icon  name="add"  size={25}   onPress={() => navigation.navigate("Import", { isEdit: false })} />
            <Icon  name="swap-vert"  size={25} onPress={() => setShowModalSort(true)}/>
            <Icon  name="filter-alt" size={25}  onPress={() => setShowModalFilter(true)}/> */}
            <IconButton size={"lg"} mt={-1}  colorScheme='warmGray' variant={"ghost"} _icon={{ as: Icon ,  name: "add", size:6 }} onPress={() => navigation.navigate("Cart", { isEdit: false })} />
            <IconButton size={"lg"} mt={-1} ml={-5} colorScheme='warmGray' variant={"ghost"} _icon={{ as: Icon ,  name: "swap-vert", size:6 }} onPress={() => setShowModalSort(true)}/>
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
                {value: 'orders.created_at', label: 'Ngày bán'},
            {value: 'total_amount', label: 'Tổng tiền bán'},
            ]}
            handleRemoveFilter={handleRemoveFilter}

        /> :null}
        {showModalFilter? 
        <PopUpFilter showModalFilter={showModalFilter}  setShowModalFilter={setShowModalFilter}
         query={query}  
         setQuery={setQuery}
         handleRemoveFilter={handleRemoveFilter}
         initialQuery={initialQuery}
         label={["Ngày bán:","Tiền bán:", "Giảm giá:" ]}

         /> 
         :null}

    </>
  )
}

export default InvoiceScreen



