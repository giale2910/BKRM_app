import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

import {TouchableOpacity} from 'react-native';
import { VStack, Text, HStack, Divider,  Avatar } from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";


 //import project
import purchaseOrderApi from "../../../../../api/purchaseOrderApi";
import NavBar from "../../../../../components/NavBar/NavBar"
import SearchBar  from "../../../../../components/SearchBar/SearchBar"
import InfiniteFlatList from "../../../../../components/InfiniteFlatList/InfiniteFlatList"
import '../../../../../util/global'
import {BillTableRow} from "../../../../../components/TableRow/TableRow"

const InventoryOrderScreen = ({navigation}) => {
    

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
            const response = await purchaseOrderApi.getAllOfBranch( store_uuid,  branch_uuid,{ page: page,limit: global.limitPerLoad, ...query});
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
    }, [branch_uuid,query]);
    
   useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setPagingState({  page: 0 ,loading:false })
            loadData(0,true);
        });
        return unsubscribe;
    }, [navigation]);


    ////

    const initialQuery = {
        startDate: '',
        endDate: '',
        minDiscount: 0,
        maxDiscount: 0,
        minTotalAmount: 0,
        maxTotalAmount: 0,
        status: '',
        paymentMethod: '',
        orderBy: 'purchase_orders.creation_date',
        sort: 'desc',
        searchKey: '',
    };

    const handleRemoveFilter = () => {
        setQuery(initialQuery)
    }
    const [query, setQuery] = useState(initialQuery)

    //3.2. filter
    const [openFilter, setOpenFilter] = React.useState(false);
    const handleToggleFilter = () => {
        setOpenFilter(!openFilter);
    };
    const onReload = () => {
        setReload(!reload);
    };

    const handleOnPress = () =>  {
        navigation.navigate("InventoryOrderDetailScreen", { row: row})
    }
const renderItem = (row, index) => {
    return (
        <BillTableRow code={row.purchase_order_code} name={row.supplier_name} date={row.creation_date} totalCost={row.total_amount}  color='primary.500' uuid={row.uuid} handleOnPress={handleOnPress}/>
        );
    };

  return (
      <>
        <NavBar  navigation={navigation} title={"Đơn nhập hàng"} >
            <Icon  name="add"  size={25}   onPress={() => navigation.navigate("Import", { isEdit: false })} />
            <Icon  name="swap-vert"  size={25} />
            <Icon  name="filter-alt" size={25} />
        </NavBar>  
        <SearchBar /> 
        <InfiniteFlatList data={customerList}  renderItem={renderItem} pagingState={pagingState} setPage={setPagingState} loadData={loadData} endList={endList} setEndList={setEndList}/> 
    </>
  )
}

export default InventoryOrderScreen



