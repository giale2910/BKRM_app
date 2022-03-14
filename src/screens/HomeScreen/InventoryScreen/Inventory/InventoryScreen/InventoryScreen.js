


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
    Icon,
    Container,
    Image,
    Stack,
    FlatList
  } from "native-base";
  import NavBar from "../../../../../components/NavBar/NavBar"
  import {StyleSheet, ScrollView,View,ActivityIndicator } from 'react-native';

  //import api
import productApi from "../../../../../api/productApi";
import storeApi from "../../../../../api/storeApi";



import InfiniteFlatList from "../../../../../components/InfiniteFlatList/InfiniteFlatList"
const InventoryScreen = ({navigation}) => {
    const [productList, setProductList] = useState([]); 

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
            const response = await productApi.getProductsOfBranch(
                store_uuid,
                branch_uuid,
            {
                page: page,
                limit: 10,
            }
            );

            if(response.data.data.length === 0 ){setEndList(true)}
            
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
            loadData(pagingState.page,true);
        }
    }, [branch_uuid]);


          
  return (
      <>
        <NavBar  navigation={navigation} title={"Sản phẩm"} />   
        <InfiniteFlatList data={productList}  renderItem={renderItem} pagingState={pagingState} setPage={setPagingState} loadData={loadData} endList={endList} setEndList={setEndList}/>
    </>
  )
}

export default InventoryScreen


const renderItem = (row, index) => {
    return (
        <Pressable  key={row.uuid} >
        <HStack justifyContent="space-between" >
            <HStack w="60%">
                <Image source={{ uri: row.img_url  }} alt={"name"}borderRadius="10" size="sm" />
                <VStack ml="3" justifyContent="space-between"  >
                    <Text fontSize='15' fontWeight="500">{row.name} </Text>
                    <Text color='grey' mt="2">{row.product_code}</Text>
                </VStack>
            </HStack>
            <VStack justifyContent="space-between" alignItems="flex-end">
                    <Text fontSize="16" color='primary.500' fontWeight="700"> {(row.list_price).toLocaleString()} </Text>
                    <Text color='grey' mt="2">Tồn: {row.branch_quantity}</Text>
            </VStack>
        </HStack>
        <Divider my="3"/>  
        </Pressable>
    );
  };


