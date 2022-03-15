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
            <Pressable  key={row.uuid} onPress={() => navigation.navigate("InventoryDetailScreen", { name: "Jane" })} >
            <HStack justifyContent="space-between" >
                <HStack w="60%">
                    <Image source={{ uri: row.img_url  }} alt={"name"}borderRadius="10" size="sm" />
                    <VStack ml="3" justifyContent="space-between"  >
                        <Text fontSize={15} fontWeight={500}>{row.name} </Text>
                        <Text color='grey' mt="2">{row.product_code}</Text>
                    </VStack>
                </HStack>
                <VStack justifyContent="space-between" alignItems="flex-end">
                        <Text fontSize={16} color='primary.500' fontWeight="700">  {(priceShow ==="Giá bán"?row.list_price:row.standard_price).toLocaleString()} </Text>
                       
                        <Text color='grey' mt="2">Tồn: {row.branch_quantity}</Text>
                </VStack>
            </HStack>
            <Divider my="3"/>  
            </Pressable>
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
            <Actionsheet.Item  color="red.500" onPress={()=>{setPriceShow("Giá bán");onClose();}}>Giá bán</Actionsheet.Item>
            <Actionsheet.Item  onPress={()=>{setPriceShow("Giá vốn"); onClose()}}>Giá vốn</Actionsheet.Item>
            </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}

export default InventoryScreen




