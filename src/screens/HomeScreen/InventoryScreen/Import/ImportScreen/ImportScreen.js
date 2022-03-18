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

import {StyleSheet, ScrollView } from 'react-native';
import ChangeCartBtn from "../../../../../components/Button/ChangeCartBtn"

import update from "immutability-helper";
import supplierApi from "../../../../../api/supplierApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartTableRow} from "../../../../../components/TableRow/TableRow"
import { cartActions } from "../../../../../store/slice/cartSlice";


const ImportScreen = ({navigation,route}) => {


  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch = info.branch;
  const user_uuid = useSelector((state) => state.info.user.uuid);
  const importCartData  = useSelector((state) => state.cart.importCart);
  const dispatch = useDispatch();

  //// ----------II. FUNCTION
  // 1.Cart
  const [cartList, setCartList] = React.useState(importCartData);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {   
    dispatch(cartActions.setImportCart(cartList));
  }, [cartList]);

  useEffect(() => {
    if (route.params?.newCart) {
      setCartList(route.params.newCart)
    }
  }, [route.params?.newCart]);


  // Multiple cart
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
      const response = await supplierApi.getSuppliers(store_uuid);
      setSuppliers(response.data);
    };
    fetchSupplier();
  }, []);
  const updateCustomer = (value) => {
    let newArr = [...cartList]; // copying the old datas array
    newArr[selectedIndex].customer = value;
    setCartList(newArr);
  };

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
    // setIsUpdateTotalAmount(!isUpdateTotalAmount);
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
    // setIsUpdateTotalAmount(!isUpdateTotalAmount);
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
    // setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };




  ////////
  const handleUpdatePaidAmount = (amount) => {
    let newCartList = update(cartList, {
      [selectedIndex]: { paid_amount: { $set: amount } },
    });

    setCartList(newCartList);
  };

  const handleUpdatePaymentMethod = (method) => {
    let newCartList = update(cartList, {
      [selectedIndex]: { payment_method: { $set: method } },
    });
    setCartList(newCartList);
  };

  const handleUpdateDiscount = (amount) => {
    let newCartList = update(cartList, {
      [selectedIndex]: { discount: { $set: amount } },
    });
    setCartList(newCartList);
  };

  const updateTotalAmount = () => {
    let total = 0;
    cartList[selectedIndex].cartItem.forEach((item) => {
      total += item.unit_price * item.quantity;
    });

    let newCartList = update(cartList, {
      [selectedIndex]: { total_amount: { $set: total } },
    });

    newCartList = update(newCartList, {
      [selectedIndex]: {
        paid_amount: { $set: total - cartList[selectedIndex].discount },
      },
    });

    setCartList(newCartList);
  };



  const handleConfirm = async () => {
    let cart = cartList[selectedIndex];
    var emptyCart = cart.cartItem.length === 0;
    if (emptyCart) {
      setOpenSnack(true);
      setSnackStatus({
        style: "error",
        message: "Giỏ hàng trống",
      });

      setOpenSnack(true);
    } else {
      let d = moment.now() / 1000;
      let importTime = moment
        .unix(d)
        .format("YYYY-MM-DD HH:mm:ss", { trim: false });

      let body = {
        supplier_uuid: cart.supplier ? cart.suplier.uuid : '',
        total_amount: cart.total_amount.toString(),
        payment_method: cart.payment_method,
        paid_amount: cart.paid_amount,
        discount: cart.discount.toString(),
        status:
          Number(cart.total_amount) - Number(cart.discount) >=
          Number(cart.paid_amount)
            ? "debt"
            : "closed",
        details: cart.cartItem,
        import_date: importTime,
      };
      // console.log(importTime);

      try {
        let res = await purchaseOrderApi.addInventory(
          store_uuid,
          branch.uuid,
          body
        );
        setSnackStatus({
          style: "success",
          message: "Nhập hàng thành công: " + res.data.purchase_order_code,
        });
        setOpenSnack(true);

        handlePrint();
        handleDelete(selectedIndex);
      } catch (err) {
        setSnackStatus({
          style: "error",
          message: "Nhập hàng thất bại! ",
        });
        setOpenSnack(true);
        console.log(err);
      }
    }
  };




  return (
    <>
    <NavBar  navigation={navigation} title={"Nhập hàng"} number={selectedIndex} >
          <MaterialCommunityIcons name="delete-forever-outline"  size={25}  color="#424242"  onPress={()=>handleDelete(selectedIndex)} />
          <ChangeCartBtn 
              selectedIndex={selectedIndex}
              cartList={cartList}
              handleChoose={handleChoose}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
              isCart={ false}
            />
    </NavBar>
    <Center mt={-3} mb={5}>
        <Pressable onPress={() =>  navigation.navigate('SearchScreen', { navcartList:cartList,selectedIndex:selectedIndex ,isCart:true}) }>   
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
    <ScrollView style={{paddingHorizontal: 18,}}>
          {cartList[selectedIndex]?.cartItem?.map((row, index)=>{
              return(
                <CartTableRow key={row.uuid} row={row} handleChangeItemPrice={handleChangeItemPrice}/>
              )
          })}
    </ScrollView>
  </>
  )
}

export default ImportScreen

