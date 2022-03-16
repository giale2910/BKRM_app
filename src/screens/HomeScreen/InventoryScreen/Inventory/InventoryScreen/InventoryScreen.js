import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import {
    NativeBaseProvider,
    Button,
    Box,
    HamburgerIcon,
    Pressable,
    Heading,
    VStack,
    Text,
    Center,
    HStack,
    Divider,
    Container,
    Image,
    Stack,
    FlatList,
    Actionsheet,
    useDisclose
  } from "native-base";
import NavBar from "../../../../../components/NavBar/NavBar"
import {StyleSheet, ScrollView,View,ActivityIndicator } from 'react-native';

  //import api
import productApi from "../../../../../api/productApi";
import storeApi from "../../../../../api/storeApi";
import Icon from "react-native-vector-icons/MaterialIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";

import SearchBar  from "../../../../../components/SearchBar/SearchBar"
import InfiniteFlatList from "../../../../../components/InfiniteFlatList/InfiniteFlatList"
import {ProductTableRow} from "../../../../../components/TableRow/TableRow"


const InventoryScreen = ({navigation}) => {

    const { isOpen, onOpen, onClose } = useDisclose();
    const [productList, setProductList] = useState([]); 

    const [searchValue, setSearchValue] = useState("");
    const [priceShow, setPriceShow] = useState("Giá bán");
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
            const response = await productApi.getProductsOfBranch( store_uuid,  branch_uuid,{ page: page,   limit: 10,});

            if(response.data.data.length === 0 || response.data.data.length < 10){setEndList(true)}
            if(isRefresh){
                setProductList(response.data.data);
                setPagingState({  page: 1 ,loading:false })
            }else{
                setProductList(productList.concat(response.data.data));
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

    // useEffect(() => {
    //     loadData(0,true);
    //     // loadData(pagingState.page,true);
    // }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData(0,true);
    });
    return unsubscribe;
    }, [navigation]);

 

    const renderItem = (row, index) => {
        return (
            <ProductTableRow 
             img={row.img_url }name={row.name}code={row.product_code} price={(priceShow ==="Giá bán"?row.list_price:row.standard_price).toLocaleString()}branch_quantity={row.branch_quantity} uuid={row.uuid}handleOnPress={()=>navigation.navigate("InventoryDetailScreen", { row: row })}/>
        );
    };
    
    
   
       
  return (
      <>
        <NavBar  navigation={navigation} title={"Sản phẩm"} >
            <Icon  name="add"  size={25}   onPress={() => navigation.navigate("AddInventory", { name: "Jane" })} />
            <Icon  name="swap-vert"  size={25} />
            <Icon  name="filter-alt" size={25} />
        </NavBar>  
        <SearchBar /> 
        <HStack  justifyContent="flex-end" mx="5" mb="2"><Text onPress={onOpen} fontSize={15} fontWeight="500">{priceShow}</Text><EntypoIcon name="chevron-down" size="20"/></HStack>
        <Divider mb="2" />
        <InfiniteFlatList data={productList}  renderItem={renderItem} pagingState={pagingState} setPage={setPagingState} loadData={loadData} endList={endList} setEndList={setEndList}/>


        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
            <Divider borderColor="gray.300" />
                <Actionsheet.Item  _text={{ fontSize:18}} onPress={()=>{setPriceShow("Giá bán");onClose();}}>Giá bán</Actionsheet.Item>
            <Divider borderColor="gray.300" />
            <   Actionsheet.Item  _text={{ fontSize:18  }}onPress={()=>{setPriceShow("Giá vốn"); onClose()}}>Giá vốn</Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    </>
  )
}

export default InventoryScreen




