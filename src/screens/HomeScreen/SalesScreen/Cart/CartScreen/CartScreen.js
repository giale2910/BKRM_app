import React ,{ useRef, useEffect, useState }from 'react'
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
    Input,
    Stack,
    Container
  } from "native-base";

import NavBar from "../../../../../components/NavBar/NavBar"
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";

import {StyleSheet, ScrollView ,FlatList} from 'react-native';
import ChangeCartBtn from "../../../../../components/Button/ChangeCartBtn"

import update from "immutability-helper";
import customerApi from "../../../../../api/customerApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartTableRow} from "../../../../../components/TableRow/TableRow"
import { cartActions } from "../../../../../store/slice/cartSlice";
import ModalCartSummary  from './ModalCartSummary';
import {calculateTotalQuantity,calculateTotalAmount} from "../../../../../util/util"

const CartScreen = ({navigation,route}) => {

  const [showModal, setShowModal] = useState(false);
  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch = info.branch;
  const user_uuid = useSelector((state) => state.info.user.uuid);
  // const importCartData  = useSelector((state) => state.cart.importCart);
  const dispatch = useDispatch();

  //// ----------II. FUNCTION
  // 1.Cart
  const [cartList, setCartList] = React.useState([ {
    supplier: null,
    cartItem: [],
    total_amount: 0,
    paid_amount: 0,
    discount: 0,
    payment_method: "cash",
  }]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);


  // 1. Get & Save cart to localStorage
  useEffect(() => {
    const _storeData = async () => {
      try {
        await AsyncStorage.setItem(
          'saleCart',
          JSON.stringify({ user_uuid: user_uuid, cartList: cartList })
        );
      } catch (error) { }
    }
    _storeData();
}, [cartList]);




  // // 2. Get new cart after search
  // useEffect(() => {
  //   if (route.params?.newCart) {
  //     setCartList(route.params.newCart)
  //   }
  // }, [route.params?.newCart]);



  // 3. Multiple cart
  const handleChoose = (index) => {
    setSelectedIndex(index);
  };
  const handleAdd = () => {
    // ADD CART
    setCartList([ ...cartList, { supplier:  null, cartItem: [], total_amount: 0, paid_amount: 0, discount: 0, payment_method: "cash", },]);
    setSelectedIndex(cartList.length);
  };
  const handleDelete = (index) => {
    // DELETE CART
    let newCartList = [...cartList]
    newCartList.splice(index, 1);
    if (newCartList.length === 0) {
      setCartList([ { supplier: null, cartItem: [],  total_amount: "0", paid_amount: "0",  discount: "0",  payment_method: "cash",  }, ]);
      setSelectedIndex(0);
    } else {
      setCartList(newCartList);
    }
    if (selectedIndex === index) {
      setSelectedIndex(0);
    } else if (selectedIndex > index) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  // 
  const [suppliers, setSuppliers] = React.useState([]);
  useEffect(() => {
    const fetchSupplier = async () => {
      const response = await customerApi.getCustomers(store_uuid);
      setSuppliers(response.data.data);
      // console.log("supplierssssss",suppliers)
    };
    fetchSupplier();
  }, []);


  const handleSelectSupplier = (selectedSupplier) => {
    let newCartList = update(cartList, {
      [selectedIndex]: { supplier: { $set: selectedSupplier } },
    });
    
    setCartList(newCartList);
  };

 

//
  const handleDeleteItemCart = (itemUuid) => {
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === itemUuid
    );
    let newCartList = update(cartList, {
      [selectedIndex]: { cartItem: { $splice: [[itemIndex, 1]] } },
    });
    setCartList(newCartList);
  };

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
  };

  const handleChangeItemPrice = (itemUuid, newPrice) => {
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === itemUuid
    );
    let newCartList = update(cartList, {
      [selectedIndex]: {
        cartItem: { [itemIndex]: { unit_price: { $set: newPrice } } },
      },
    });
    setCartList(newCartList);
  };

  ////////
  const handleUpdateBatches = (itemUuid, selectedBatches) => {
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === itemUuid
    );

    if (itemIndex === -1) return;
    const newCartList = [...cartList];
    newCartList[selectedIndex].cartItem[itemIndex].selectedBatches =
      selectedBatches;

    setCartList(newCartList);
  };


  var correctQuantity = cartList[selectedIndex].cartItem.every(function (element, index) {
    if (element.quantity > element.branch_quantity) return false;
    else return true;
  });

  const total_quantity = calculateTotalQuantity(cartList[selectedIndex].cartItem)
  const total_amount = calculateTotalAmount(cartList[selectedIndex].cartItem)

  const renderItem = (row, index) =>{
    return(
      <CartTableRow  key={row.uuid} row={row} handleChangeItemPrice={handleChangeItemPrice} handleChangeItemQuantity={handleChangeItemQuantity} handleDeleteItemCart={handleDeleteItemCart} handleUpdateBatches={handleUpdateBatches}/>

    )
  }
  return (
    <Box bg='white' flex={1}>
    <NavBar  navigation={navigation} title={"Giỏ hàng"} number={selectedIndex} >
          <MaterialCommunityIcons  name="delete-forever-outline"  size={25}  color="#424242"  onPress={()=>handleDelete(selectedIndex)} />
          <ChangeCartBtn 
              selectedIndex={selectedIndex}
              cartList={cartList}
              handleChoose={handleChoose}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
              isCart={ true}
            
            />
    </NavBar>
    <Center mt={-3} mb={2} >
        <Pressable onPress={() =>  navigation.navigate('SearchScreen', { navcartList:cartList,selectedIndex:selectedIndex ,isCart:true}) }>   
        {/* <Pressable onPress={() =>  navigation.navigate('SearchScreen', { selectedIndex:selectedIndex ,isCart:true}) }>    */}

            <Box borderWidth="1"  borderColor="coolGray.200"borderRadius="20" w="92%" h="12" justifyContent="center" px="2">
                <HStack >
                  <MaterialIcons  name="search"  size={25}  color="grey" /> 
                  <Text  w="85%"color="grey"  fontSize={15}> Tìm kiếm sản phẩm</Text>
                  <Pressable onPress={() =>  navigation.navigate('BarCodeScreen', { name: 'Jane' }) } >
                  <Icon  name="barcode"  size={25}  color="grey"  /> 
                  </Pressable>
                </HStack>
            </Box>
        </Pressable>
    </Center>
    {/* <ScrollView style={{paddingHorizontal: 16,}} >
          {cartList[selectedIndex]?.cartItem?.map((row, index)=>{
              return(
                <CartTableRow  key={row.uuid} row={row} handleChangeItemPrice={handleChangeItemPrice} handleChangeItemQuantity={handleChangeItemQuantity} handleDeleteItemCart={handleDeleteItemCart} handleUpdateBatches={handleUpdateBatches}/>
              )
          })}
    </ScrollView> */}

    <FlatList
      style={{paddingHorizontal:16,}}
      data={cartList[selectedIndex]?.cartItem }
      renderItem={({ item, index }) => renderItem(item, index)}
      keyExtractor={(item, index) => item.uuid.toString()}
    />

    <Divider />
    <HStack alignItems="center" justifyContent="space-between" m={3}mt={5}>
      <Text fontSize={16} bold>Tổng tiền hàng ({total_quantity.toLocaleString() })</Text>
      <Text fontSize={18} bold>{total_amount?.toLocaleString()}</Text>
    </HStack>

    <Button m={3} size='lg' onPress={() => setShowModal(true)}  isDisabled={cartList[selectedIndex].cartItem.length === 0 && correctQuantity?true:false}> Thanh toán </Button>
    
    {showModal?<ModalCartSummary selectedIndex={selectedIndex} showModal={showModal} setShowModal={setShowModal} cartData={cartList[selectedIndex]} total_amount={total_amount} total_quantity={total_quantity} handleDelete={()=>handleDelete(selectedIndex)} navigation={navigation} suppliers={suppliers} handleSelectSupplier={handleSelectSupplier}/>:null}

  </Box>
  )
}

export default CartScreen






  // useEffect(() => {
  //   const _retrieveData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('importCart');
  //       if (value !== null) {
  //         const data = JSON.parse(value);
  //         if (data.user_uuid === user_uuid) {
  //           // alert(JSON.stringify(data))
  //           setCartList(data.cartList);
  //         }
  //       }
  //     } catch (error) {}
  //   };
  //   _retrieveData();
  // }, [navigation]);


  // useEffect(() => {
  //   const _retrieveData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('productData');
  //       if (value !== null) {
  //         alert("!= null")
  //         const data = JSON.parse(value);
  //         if (data.user_uuid === user_uuid) {
  //           setProductList(data.cartList);
  //         }
  //       }
  //     } catch (error) {}
  //   };
  //   _retrieveData();
  // }, [navigation]);