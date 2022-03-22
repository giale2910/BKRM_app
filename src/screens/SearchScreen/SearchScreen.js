import React,{ useState, useEffect, useRef } from 'react'
import {Box, HStack, Input, IconButton} from "native-base";
import {useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/slice/cartSlice";

import BackNavBar from "../../components/NavBar/BackNavBar"
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import {StyleSheet, ScrollView,FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productApi from "../../api/productApi";

import InfiniteFlatList from "../../components/InfiniteFlatList/InfiniteFlatList"
import update from "immutability-helper";
import '../../util/global'
import {ProductTableRow} from "../../components/TableRow/TableRow"
const SearchScreen = ({navigation, route}) => {
  const {navcartList,selectedIndex, isCart} = route.params;

  const productData  = useSelector((state) => state.data.product);
  const [productList, setProductList] = useState(productData); 

  // redux

  
  const user_uuid = useSelector((state) => state.info.user.uuid);

  const [cartList, setCartList] = React.useState(navcartList);

  // useEffect(()=>{
  //   const _retrieveSaleCart = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('saleCart');
  //       // console.log("Asynvalue",value.productData.length)
  //       if (value !== null) {
  //         const data = JSON.parse(value);
  //         if (data.user_uuid === user_uuid) {
  //           console.log("data",data)
  //           setCartList(data)
  //         }
  //       }
  //     } catch (error) {
  //       console.log("retrieve error",error)
  //     }
  //   };

  //   _retrieveSaleCart()
  // },[])
  const handleSelect = (selectedOption) => {
    console.log("selectedOption.has_batches ", selectedOption.has_batches)
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === selectedOption.uuid
    );
    
    if (itemIndex === -1) {
    
      let newCartItem = {
        id: cartList[selectedIndex].cartItem.length,
        uuid: selectedOption.uuid,
        // quantity: 1,
        // barcode: selectedOption.bar_code,
        // // unit_price: selectedOption.list_price,
        // unit_price:isCart ? selectedOption.list_price:selectedOption.standard_price,
        // img_url: selectedOption.img_url,
        // name: selectedOption.name,
        quantity: selectedOption.has_batches ? 0 : 1,
        bar_code: selectedOption.bar_code,
        product_code: selectedOption.product_code,
        unit_price:selectedOption.standard_price,
        img_url: selectedOption.img_url,
        name: selectedOption.name,
        has_batches: selectedOption.has_batches,
        // batches: selectedOption.batches,
        // batches: selectedOption.batches,
        // selectedBatches: selectedOption.batches,
        batches:[],
        selectedBatches:[],
      };
  
      // let newCartList = update(cartList, {
      //   [selectedIndex]: { cartItem: { $push: [newCartItem] } },
      // });
      // setCartList(newCartList);
      let newCartList = [...cartList];
      newCartList[selectedIndex].cartItem.push(newCartItem)


      return
    } 
    let item = cartList[selectedIndex].cartItem.find(
      (item) => item.uuid === selectedOption.uuid
    );

    if (!item.has_batches) {
      // let newCartList = update(cartList, {
      //   [selectedIndex]: {  cartItem: { [itemIndex]: { quantity: { $set: cartList[selectedIndex]?.cartItem[itemIndex]?.quantity + 1 } } },},
      // });
      // setCartList(newCartList);

      let newCartList = [...cartList];
      newCartList[selectedIndex].cartItem[itemIndex].quantity +=   1
    }
  

  };
  const handleSelectCart = (selectedOption) => {
    console.log("selectedOption.has_batches ", selectedOption.has_batches)

    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === selectedOption.uuid
    );
    let item = cartList[selectedIndex].cartItem.find(
      (item) => item.uuid === selectedOption.uuid
    );
    console.log("item", item)
    console.log("!item",!item)

    if (!item) {
      let newCartItem = {
        id: cartList[selectedIndex].cartItem.length,
        uuid: selectedOption.uuid,
        quantity: selectedOption.has_batches ? 0 : 1,
        product_code: selectedOption.product_code,
        bar_code: selectedOption.bar_code,
        unit_price: selectedOption.list_price,
        img_url: selectedOption.img_url,
        name: selectedOption.name,
        branch_quantity: Number(selectedOption.branch_quantity),
        has_batches: selectedOption.has_batches,
        // batches: selectedOption.batches,
        batches: [],
      };

      // let newCartList = update(cartList, {
      //   [selectedIndex]: { cartItem: { $push: [newCartItem] } },
      // });
      // setCartList(newCartList);
      let newCartList = [...cartList];
      newCartList[selectedIndex].cartItem.push(newCartItem)
      return;
    }

    if (!item.has_batches) {
      // let newCartList = update(cartList, {
      //   [selectedIndex]: {  cartItem: { [itemIndex]: { quantity: { $set: cartList[selectedIndex]?.cartItem[itemIndex]?.quantity + 1 } } },},
      // });
      // setCartList(newCartList);
      let newCartList = [...cartList];
      newCartList[selectedIndex].cartItem[itemIndex].quantity  += 1  
    }else {
        if (
          cartList[selectedIndex].cartItem[itemIndex].selectedBatches?.length ===
          1
        ) {
          // handleChangeItemQuantity(
          //   selectedOption.uuid,
          //   cartList[selectedIndex].cartItem[itemIndex].quantity + 1
          // );
          // let newCartList = update(cartList, {
          //   [selectedIndex]: {  cartItem: { [itemIndex]: { quantity: { $set: cartList[selectedIndex]?.cartItem[itemIndex]?.quantity + 1 } } },},
          // });

          // newCartList[selectedIndex].cartItem[
          //   itemIndex
          // ].selectedBatches[0].additional_quantity += 1;
          // setCartList(newCartList);
        }


          let newCartList = [...cartList];
          newCartList[selectedIndex].cartItem[itemIndex].quantity += 1  
          newCartList[selectedIndex].cartItem[itemIndex].selectedBatches[0].additional_quantity  += 1  

          // const newCartList = [...cartList];
         
      }

    // };
      
  };


  // const itemSelect = cartList[selectedIndex].cartItem.map((item) => ( {uuid: item.uuid, quantity: item.quantity}))

  const setSearchResult = (searchKey) =>{
    if(searchKey){
      //SEARCH
      setProductList(searchKey);
    }else{
      setProductList(productData)
    }
  }

  const renderItem = (row, index) =>{
    return(
    <ProductTableRow key={row.uuid} 
    // isSelect={itemSelect.find( item => item['uuid'] === row.uuid) }
    isSelect={cartList[selectedIndex].cartItem.find( item => item['uuid'] === row.uuid) }
    img={row.img_url } name={row.name}code={row.product_code} price={(isCart ? row.list_price:row.standard_price).toLocaleString()}branch_quantity={row.branch_quantity} uuid={row.uuid} handleOnPress={()=>{isCart?handleSelectCart(row):handleSelect(row)}}
    
    />
    )
  }

  return (
    <>
      <HStack mt="9" ml="4" mb="9" mr="5" justifyContent="space-between" alignItems="center">
              <IconButton ml={-2} mr={1}size={"lg"} colorScheme='warmGray' variant={"ghost"} _icon={{ as: AntDesignIcon ,  name: "left", size:5 }}onPress={() => { navigation.navigate(isCart ?'CartScreen': 'ImportScreen', {newCart: cartList})}} />
              <Input  
                  w="70%"
                  InputLeftElement={<Box pl={2} pt={5} ><MaterialIcons  name="search"  size={25}  color="grey"  /> </Box>} 
                  InputRightElement={<Box pr={3} pt={5}><Icon  name="barcode"  size={25}  color="grey"  /> </Box>} 
                  h={12}
                  ml={-2}
                  size="md" p={3} variant="rounded" placeholder="Tìm sản phẩm (mã sp, tên)"  
                  onChangeText={val => setSearchResult(val)}   
              /> 
              {!isCart?<MaterialIcons  name="add"  size={25}   onPress={() => navigation.navigate("AddInventory", { name: "Jane" })} /> :null}   
      </HStack>
{/* 
    <ScrollView style={{padding:18, marginTop:-20}}>
      {productList.map(((row, index) => {
        // console.log("rowwwwwww", row.batches)
        return(
          <ProductTableRow key={row.uuid} 
          // isSelect={itemSelect.find( item => item['uuid'] === row.uuid) }
          isSelect={cartList[selectedIndex].cartItem.find( item => item['uuid'] === row.uuid) }
          img={row.img_url } name={row.name}code={row.product_code} price={(isCart ? row.list_price:row.standard_price).toLocaleString()}branch_quantity={row.branch_quantity} uuid={row.uuid} handleOnPress={()=>{isCart?handleSelectCart(row):handleSelect(row)}}/>
        )
      } ))}
    </ScrollView> */}
    <FlatList
    style={{padding:18}}
      data={productList}
      renderItem={({ item, index }) => renderItem(item, index)}
      keyExtractor={(item, index) => item.uuid.toString()}
    />

    
</>
  )
}

export default SearchScreen

