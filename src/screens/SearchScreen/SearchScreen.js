import React,{ useState, useEffect, useRef } from 'react'
import {Box, HStack, Input, IconButton} from "native-base";
import {useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/slice/cartSlice";

import BackNavBar from "../../components/NavBar/BackNavBar"
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import {StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productApi from "../../api/productApi";

import InfiniteFlatList from "../../components/InfiniteFlatList/InfiniteFlatList"
import update from "immutability-helper";
import '../../util/global'
import {ProductTableRow} from "../../components/TableRow/TableRow"
const SearchScreen = ({navigation, route}) => {
  const {navcartList,selectedIndex, isCart} = route.params;

  const [cartList, setCartList] = React.useState(navcartList);
  const productData  = useSelector((state) => state.data.product);
  const [productList, setProductList] = useState(productData); 

  // redux


  const handleSelect = (selectedOption) => {
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === selectedOption.uuid
    );
    if (itemIndex !== -1) {
      let newCartList = update(cartList, {
        [selectedIndex]: {  cartItem: { [itemIndex]: { quantity: { $set: cartList[selectedIndex]?.cartItem[itemIndex]?.quantity + 1 } } },},
      });
      setCartList(newCartList);

    }else{
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
        unit_price:isCart ? selectedOption.list_price:selectedOption.standard_price,
        img_url: selectedOption.img_url,
        name: selectedOption.name,
        has_batches: selectedOption.has_batches,
        // batches: selectedOption.batches,
        batches:[],
        selectedBatches:[]
      };
  
      let newCartList = update(cartList, {
        [selectedIndex]: { cartItem: { $push: [newCartItem] } },
      });
      setCartList(newCartList);
    }    
  };


  const itemSelect = cartList[selectedIndex].cartItem.map((item) => ( {uuid: item.uuid, quantity: item.quantity}))


  const setSearchResult = (searchKey) =>{
    if(searchKey){
      //SEARCH
      setProductList(searchKey);
    }else{
      setProductList(productData)
    }
  }
  return (
    <>
      <HStack mt="9" ml="4" mb="9" mr="5" justifyContent="space-between" alignItems="center">
              <IconButton ml={-2} mr={1}size={"lg"} colorScheme='warmGray' variant={"ghost"} _icon={{ as: AntDesignIcon ,  name: "left", size:5 }}onPress={() => { navigation.navigate('ImportScreen', {newCart: cartList})}} />
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

    <ScrollView style={{padding:18, marginTop:-20}}>
      {productList.map(((row, index) => {
        return(
          <ProductTableRow key={row.uuid} 
          isSelect={itemSelect.find( item => item['uuid'] === row.uuid) }
          img={row.img_url }name={row.name}code={row.product_code} price={(isCart ? row.list_price:row.standard_price).toLocaleString()}branch_quantity={row.branch_quantity} uuid={row.uuid} handleOnPress={()=>handleSelect(row)}/>
        )
      } ))}
    </ScrollView>
</>
  )
}

export default SearchScreen

