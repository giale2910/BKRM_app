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

import {StyleSheet, ScrollView } from 'react-native';
import ChangeCartBtn from "../../../../../components/Button/ChangeCartBtn"

import update from "immutability-helper";
import supplierApi from "../../../../../api/supplierApi";
import AsyncStorage from '@react-native-async-storage/async-storage';



const ImportScreen = ({navigation}) => {
  const [show, setShow] = React.useState(false);

  const [selectedBranch, setSelectedBranch] = useState({});

  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch = info.branch;
  const user_uuid = useSelector((state) => state.info.user.uuid);


  // const [cartList, setCartList] = React.useState([
  //   {
  //     supplier: null,
  //     cartItem: [],
  //     total_amount: 0,
  //     paid_amount: 0,
  //     discount: 0,
  //     payment_method: "cash",
  //   },
  // ]);

  const loadLocalStorage = async() => {
    const importData= await  AsyncStorage.getItem('@importListData')
    // alert(importData)
    if (importData) {
      const data = JSON.parse(importData);
      if (data.user_uuid === user_uuid) {
        return data.cartList;
      }
    }
    return [
      {
        supplier: null,
        cartItem: [],
        total_amount: 0,
        paid_amount: 0,
        discount: 0,
        payment_method: "cash",
      },
    ];
  };
  const [cartList, setCartList] = React.useState(loadLocalStorage());

  useEffect(() => {
    (async () =>  await AsyncStorage.setItem('@importListData', JSON.stringify({ user_uuid: user_uuid, cartList: cartList })))();
  }, [cartList]);

  useEffect(() => {
    (async () => loadLocalStorage())();
  }, []);

  //// ----------II. FUNCTION
  // 1.Cart
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [suppliers, setSuppliers] = React.useState([]);

//==============
  // const [isUpdateTotalAmount, setIsUpdateTotalAmount] = React.useState(false);

  // useEffect(() => {
  //   updateTotalAmount();
  // }, [isUpdateTotalAmount]);

  useEffect(() => {
    const fetchSupplier = async () => {
      const response = await supplierApi.getSuppliers(store_uuid);
      // console.log("supplierApi",response.data)
      setSuppliers(response.data);
      setCartList([
        {
          supplier: null,
          cartItem: [],
          total_amount: "0",
          paid_amount: "0",
          discount: "0",
          payment_method: "cash",
        },
      ]);
    };

    fetchSupplier();
  }, []);

  const [reloadSupplier, setReloadSupplier] = useState(false);
  useEffect(() => {
    const fetchSupplier = async () => {
      const response = await supplierApi.getSuppliers(store_uuid);
      setSuppliers(response.data);
    };

    fetchSupplier();
  }, [reloadSupplier]);



 
  const handleChoose = (index) => {
    setSelectedIndex(index);
  };
  const handleAdd = () => {
    // ADD CART
    setCartList([
      ...cartList,
      {
        supplier:  null,
        cartItem: [],
        total_amount: 0,
        paid_amount: 0,
        discount: 0,
        payment_method: "cash",
      },
    ]);
    setSelectedIndex(cartList.length);
  };
  const handleDelete = (index) => {
    // DELETE CART
    cartList.splice(index, 1);
    if (cartList.length === 0) {
      setCartList([
        {
          supplier: null,
          cartItem: [],
          total_amount: "0",
          paid_amount: "0",
          discount: "0",
          payment_method: "cash",
        },
      ]);
      setSelectedIndex(0);
    } else {
      setCartList(cartList);
    }
    if (selectedIndex === index) {
      setSelectedIndex(0);
    } else if (selectedIndex > index) {
      setSelectedIndex(selectedIndex - 1);
    }
  };
  const updateCustomer = (value) => {
    let newArr = [...cartList]; // copying the old datas array
    newArr[selectedIndex].customer = value;
    setCartList(newArr);
  };


  //snack
  // const [openSnack, setOpenSnack] = React.useState(false);
  // const [snackStatus, setSnackStatus] = React.useState({
  //   style: "error",
  //   message: "Nhập hàng thất bại",
  // });

  // const handleCloseSnackBar = (event, reason) => {
  //   setOpenSnack(false);
  // };

  //2. Table sort
  // const [order, setOrder] = React.useState("asc");
  // const [orderBy, setOrderBy] = React.useState(null);
  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  //mode
  // const [mode, setMode] = React.useState(false);
  // const handleChangeMode = (event) => {
  //   setMode(event.target.checked);
  // };

  // handle search select item add to cart
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

  const handleSelectSupplier = (selectedSupplier) => {
    let newCartList = update(cartList, {
      [selectedIndex]: { supplier: { $set: selectedSupplier } },
    });
    setCartList(newCartList);
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


  ///

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
      // console.log(err);
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
    <NavBar  navigation={navigation} title={"Nhập hàng"} number={selectedIndex} selectedIndex={selectedIndex} cartList={cartList}handleChoose={handleChoose}handleDelete={handleDelete} handleAdd={handleAdd}/>
    <Center>
        <Pressable onPress={() =>  navigation.navigate('SearchScreen', { name:"Jane" }) }>   
            <Box borderWidth="1"  borderColor="coolGray.200"borderRadius="20" w="92%" h="12" justifyContent="center" px="2">
                <HStack >
                  <MaterialIcons  name="search"  size={25}  color="grey" /> 
                  <Text  w="85%"color="grey"  fontSize={15}> Tìm kiếm sản phẩm</Text>
                  <Pressable onPress={() =>  navigation.navigate('BarCodeScreen', { name: 'Jane' }) }>
                  <Icon  name="barcode"  size={25}  color="grey"  /> 
                  </Pressable>
                </HStack>
            </Box>
        </Pressable>
    </Center>
    <ScrollView style={styles.scrollView}>
      

    </ScrollView>
  </>
  )
}

export default ImportScreen

// export const ChangeCartBtn = ({selectedIndex,cartList,handleChoose,handleDelete,handleAdd}) =>{
//   return (
//     <ChangeCartBtn
//     selectedIndex={selectedIndex}
//     cartList={cartList}
//     handleChoose={handleChoose}
//     handleDelete={handleDelete}
//     handleAdd={handleAdd}
//     isCart={true}
//   />
//   )
// }


const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 18,
  },

});
