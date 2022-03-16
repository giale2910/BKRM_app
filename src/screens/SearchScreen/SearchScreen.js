import React,{ useState, useEffect, useRef } from 'react'
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
    Image,
    Input
  } from "native-base";
  import { useSelector } from "react-redux";

import BackNavBar from "../../components/NavBar/BackNavBar"
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productApi from "../../api/productApi";

import InfiniteFlatList from "../../components/InfiniteFlatList/InfiniteFlatList"
import update from "immutability-helper";

const SearchScreen = ({navigation, route}) => {
  const {navcartList,selectedIndex} = route.params;
  const user_uuid = useSelector((state) => state.info.user.uuid);

  const [cartList, setCartList] = React.useState(navcartList);


// //Choose item
//   const loadLocalStorage = async() => {
//     const importData= await  AsyncStorage.getItem('@importListData')
//     // alert(importData)
//     if (importData) {
//       const data = JSON.parse(importData);
//       if (data.user_uuid === user_uuid) {
//         return data.cartList;
//       }
//     }
//     return [
//       {
//         supplier: null,
//         cartItem: [],
//         total_amount: 0,
//         paid_amount: 0,
//         discount: 0,
//         payment_method: "cash",
//       },
//     ];
//   };
//   useEffect(() => {
//     (async () => loadLocalStorage())();
//   }, []);
  useEffect(() => {
    (async () =>  await AsyncStorage.setItem('@importListData', JSON.stringify({ user_uuid: user_uuid, cartList: cartList })))();
  }, [cartList]);


  const handleChangeItemQuantity = (itemUuid, newQuantity) => {
    if (newQuantity === 0) {
      handleDeleteItemCart(itemUuid);
      return;
    }
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === itemUuid
    );
    let newCartList = update(cartList, {
      [selectedIndex]: {
        cartItem: { [itemIndex]: { quantity: { $set: newQuantity } } },
      },
    });
    setCartList(newCartList);
    // setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };

  const handleSearchBarSelect = (selectedOption) => {
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === selectedOption.uuid
    );

    if (itemIndex !== -1) {
      handleChangeItemQuantity(
        selectedOption.uuid,
        cartList[selectedIndex].cartItem[itemIndex].quantity + 1
      );
      return;
    }
    let newCartItem = {
      id: cartList[selectedIndex].cartItem.length,
      uuid: selectedOption.uuid,
      quantity: 1,
      barcode: selectedOption.bar_code,
      unit_price: selectedOption.list_price,
      img_url: selectedOption.img_url,
      name: selectedOption.name,
    };

    let newCartList = update(cartList, {
      [selectedIndex]: { cartItem: { $push: [newCartItem] } },
    });
    setCartList(newCartList);
    // setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };

  




  // ==========
  // const { handleSearchBarSelect  } = route.params;
  const [priceShow, setPriceShow] = useState("Giá bán");


  const [productList, setProductList] = useState([]); 
   // redux
   const info = useSelector((state) => state.info);
   const store_uuid = info.store.uuid;
   const branch_uuid = info.branch.uuid;
   const [pagingState, setPagingState] = useState({ page: 0, loading: false });
   const [endList, setEndList] = useState(false);

  //load Data
    useEffect(() => {
        setPagingState({ ...pagingState, page:0 });
    }, [store_uuid, branch_uuid]);

    const loadData = async (page, isRefresh=false) => {
      try {
          const response = await productApi.getProductsOfBranch( store_uuid,  branch_uuid,{ page: page,   limit: 30,});

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
    useEffect(() => {
      loadData(pagingState.page,true);
    }, []);

    //Search
   const loadingData = async ( searchKey) => {
     const response = await productApi.searchBranchProduct(
       store_uuid,
       branch_uuid,
       searchKey
     );
    //  setOptions(response.data.data);
    setProductList(response.data.data);
   };

   const handleOnTextChange = (val) =>{
      if(val){
        loadingData(val)
      }else{
        loadData(0, true)
      }
   }




   const renderItem = (row, index) => {
    // onChange={(event, value) => {
      //   if (value) {
      //     // setSelectedOption(value);
      //     handleSearchBarSelect(value);
      //   }
      // }}
  return (
      <Pressable  key={row.uuid} onPress={() =>handleSearchBarSelect(row)} >
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
    <BackNavBar navigation={navigation}> 
      <Input  
          w="80%"
          InputLeftElement={<Box pl={2} pt={5} ><MaterialIcons  name="search"  size={25}  color="grey"  /> </Box>} 
          InputRightElement={<Box pr={3} pt={5}><Icon  name="barcode"  size={25}  color="grey"  /> </Box>} 
          h={12}
          size="md" p={3} variant="rounded" placeholder="Tìm sản phẩm (mã sp, tên)"  
          onChangeText={val => handleOnTextChange(val)}   
      /> 
      <MaterialIcons  name="add"  size={25}   onPress={() => navigation.navigate("AddInventory", { name: "Jane" })} />
    </BackNavBar>
    

    <InfiniteFlatList data={productList}  renderItem={renderItem} pagingState={pagingState} setPage={setPagingState} loadData={loadData} endList={endList} setEndList={setEndList}/>

</>
  )
}

export default SearchScreen


const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 18,
  },

});
