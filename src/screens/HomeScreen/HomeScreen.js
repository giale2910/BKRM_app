import React from 'react'
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
  View,
  AlertDialog
} from "native-base";
import { Image } from 'react-native';
import { createDrawerNavigator,DrawerContentScrollView } from '@react-navigation/drawer';
import Cart from "./SalesScreen/Cart/Cart"
import Invoice from "./SalesScreen/Invoice/Invoice"
import InvoiceReturn from "./SalesScreen/InvoiceReturn/InvoiceReturn"

import Import from "./InventoryScreen/Import/Import"
import Inventory from "./InventoryScreen/Inventory/Inventory"
import InventoryOrder from "./InventoryScreen/InventoryOrder/InventoryOrder"
import InventoryReturnOrder from "./InventoryScreen/InventoryReturnOrder/InventoryReturnOrder"
import OrderProductList from "./InventoryScreen/OrderProductList/OrderProductList"
import CheckHistory from "./InventoryScreen/CheckHistory/CheckHistory"
import Supplier from "./InventoryScreen/Supplier/Supplier"


import Branch from "./ManagerScreen/Branch/Branch"
import Customer from "./ManagerScreen/Customer/Customer"
import History from "./ManagerScreen/History/History"
import Report from "./ManagerScreen/Report/Report"
import Setting from "./ManagerScreen/Setting/Setting"

import  Employee from "./HRScreen/Employee/Employee"
import  Schedule from "./HRScreen/Schedule/Schedule"



//import icon
import cartIcon from "../../assets/img/icon/cart1.png";
import invoiceIcon from "../../assets/img/icon/invoice.png";
import invoiceReturnIcon from "../../assets/img/icon/invoiceReturn.png";

import importIcon from "../../assets/img/icon/inventory1.png";
import inventoryIcon from "../../assets/img/icon/inventory2.png";
import inventoryOrderIcon from "../../assets/img/icon/inventoryOrder1.png";
import inventoryReturnOrderIcon from "../../assets/img/icon/inventoryReturn.png";
import suplierIcon from "../../assets/img/icon/supplier4.png";
import orderIcon from "../../assets/img/icon/python.png";
import orderListIcon from "../../assets/img/icon/check1.png";
import checkIcon from "../../assets/img/icon/magnifiers.png";
import checkHistoryIcon from "../../assets/img/icon/hourglass.png";

import employeeIcon from "../../assets/img/icon/employee7.png";
import scheduleIcon from "../../assets/img/icon/schedule3.png";

import historyIcon from "../../assets/img/icon/piggy-bank.png";
import branchIcon from "../../assets/img/icon/branch5.png";
import customerIcon from "../../assets/img/icon/customer.png";
import statisticIcon from "../../assets/img/icon/statistics.png";

import webIcon from "../../assets/img/icon/www.png";
import settingIcon from "../../assets/img/icon/setting.png"
import deliveryIcon from "../../assets/img/icon/history3.png";



//

// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import branchApi from "../../api/branchApi";
import productApi from "../../api/productApi"
import { infoActions } from "../../store/slice/infoSlice";
import { Select } from "native-base";
import { useDispatch, useSelector } from "react-redux";

const Drawer = createDrawerNavigator();

const salesModule = {
  title: "Bán hàng",
  children: [
    {
      id: 1,
      title: "Giỏ Hàng",
      // url: "/home/sales/cart",
      name:"Cart",
      icon: cartIcon,
      // icon1: icons.ShoppingCartOutlinedIcon,
      // icon2: icons1.ShoppingCartTwoToneIcon,
    },
    {
      id: 2,
      title: "Hóa Đơn",
      // url: "/home/sales/invoice",
      name:"Invoice",
      icon: invoiceIcon,
      // icon1: icons.LoyaltyOutlinedIcon,
      // icon2: icons1.LoyaltyTwoToneIcon,
    },
    {
      id: 3,
      title: "Đơn Trả",
      // url: "/home/sales/invoice-return",
      name:"InvoiceReturn",
      icon: invoiceReturnIcon,
      // icon1: icons.RestorePageOutlinedIcon,
      // icon2: icons1.RestorePageTwoToneIcon,
    },
  ],
};

const inventoryModule = {
  title: "Kho Hàng",
  children: [
    {
      id: 4,
      title: "Nhập Hàng",
      // url: "/home/inventory/import",
      name:"Import",
      icon: importIcon,
      // icon1: icons.AddCircleOutlineOutlinedIcon,
      // icon2: icons1.AddCircleTwoToneIcon,
    },
    {
      id: 5,
      title: "Sản phẩm",
      // url: "/home/inventory/inventory",
      name:"Inventory",
      icon: inventoryIcon,
      // icon1: icons.ThumbUpAltOutlinedIcon,
      // icon2: icons1.ThumbUpAltTwoToneIcon,
    },
    {
      id: 6,
      title: "Đơn Nhập Hàng",
      // url: "/home/inventory/receipt",
      name:"InventoryOrder",
      icon: inventoryOrderIcon,
      // icon1: icons.LibraryBooksOutlinedIcon,
      // icon2: icons1.LibraryBooksTwoToneIcon,
    },
    {
      id: 7,
      title: "Đơn Trả Hàng Nhập",
      // url: "/home/inventory/returns",
      name:"InventoryReturnOrder",
      component: <InventoryReturnOrder />,
      icon: inventoryReturnOrderIcon,
      // icon1: icons.SyncProblemOutlinedIcon,
      // icon2: icons1.SyncProblemTwoToneIcon,
    },
    {
      id: 8,
      title: "Đặt Hàng",
      url: "/home/inventory/order-list",
      name:"OrderProductList",
      component: <OrderProductList />,
      icon: orderListIcon,
      // icon1: icons.AddIcCallOutlinedIcon,
      // icon2: icons1.AddIcCallTwoToneIcon,
    },
    {
      id: 9,
      title: "Kiểm Kho",
      url: "/home/inventory/check-history",
      name:"CheckHistory",
      component: <CheckHistory />,
      icon: checkIcon,
      // icon1: icons.FindInPageOutlinedIcon,
      // icon2: icons1.FindInPageTwoToneIcon,
    },
    {
      id: 10,
      title: "Nhà Cung Cấp",
      // url: "/home/inventory/supplier",
      name:"Supplier",
      component: <Supplier />,
      icon: suplierIcon,
      // icon1: icons.ExtensionOutlinedIcon,
      // icon2: icons1.ExtensionTwoToneIcon,
    },
  ],
};
const deliveryModule = {
  title: "Giao hàng",
  children: [
    {
      id: 11,
      title: "Đơn giao hàng",
      name:"Delivery",
      name:"Cart",
      // url: "/home/delivery/delivery",
      // component: <Employee />,
      icon: deliveryIcon,
      // icon1: icons.LocalShippingOutlinedIcon,
      // icon2: icons1.LocalShippingTwoToneIcon,
    },
  ],
};
const hrModule = {
  title: "Nhân Sự",
  children: [
    {
      id: 11,
      title: "Nhân Viên",
      name:"Employee",
      // url: "/home/hr/employee",
      component: <Employee />,
      icon: employeeIcon,
      // icon1: icons.AccountCircleOutlinedIcon,
      // icon2: icons1.AccountCircleTwoToneIcon,
    },
    {
      id: 12,
      title: "Ca Làm Việc",
      name:"Schedule",
      // url: "/home/hr/schedule",
      component: <Schedule />,
      icon: scheduleIcon,
      // icon1: icons.EventAvailableOutlinedIcon,
      // icon2: icons1.EventAvailableTwoToneIcon,
    },
  ],
};
const reportModule = {
  title: "Quản Lý",
  children: [
    {
      id: 13,
      title: "Lịch Sử Hoạt Động",
      name:"History",
      // url: "/home/manager/history",
      component: <History />,
      icon: historyIcon,
      // icon1: icons.RestoreOutlinedIcon,
      // icon2: icons1.RestoreTwoToneIcon,
    },
    {
      id: 14,
      title: "Cửa Hàng",
      name:"Branch",
      // url: "/home/manager/branch",
      component: <Branch />,
      icon: branchIcon,
      // icon1: icons.StorefrontOutlinedIcon,
      // icon2: icons1.StorefrontTwoToneIcon,
    }, 
    {
      id: 15,
      title: "Khách Hàng",
      name:"Customer",
      // url: "/home/manager/customer",
      component: <Customer />,
      icon: customerIcon,
      // icon1: icons.FavoriteBorderOutlinedIcon,
      // icon2: icons1.FavoriteTwoToneIcon,
    },
    {
      id: 16,
      title: "Cài đặt",
      name:"Setting",
      // url: "/home/manager/setting",
      component: <Setting />,
      // icon: webIcon,
      icon: settingIcon,
      // icon1: icons.LanguageOutlinedIcon,
      // icon2: icons1.LanguageTwoToneIcon,
      children: [
        { id: 19.1, title: "Cài đặt chung", url: "/home/manager/setting" },
        { id: 19.2, title: "Khuyến mãi", url: "/home/manager/setting-discount" },
        { id: 19.3, title: "Voucher", url: "/home/manager/setting-voucher" },
        { id: 19.4, title: "Mẫu email", url: "/home/manager/setting-email" },
        { id: 19.5, title: "Trang web", url: "/home/manager/setting-web" },
      ],
    },
    {
      id: 17,
      title: "Thống Kê",
      name:"Cart",
      // url: "/home/manager/report",
      component: <Report />,
      icon: statisticIcon,
      // icon1: icons.DonutSmallOutlinedIcon,
      // icon2: icons1.DonutSmallTwoToneIcon,
      children: [
        { id: 20.1, title: "Tổng quan", url: "/home/manager/report" },
        { id: 20.2, title: "Sổ quỹ", url: "/home/manager/report" },
        { id: 20.3, title: "Báo cáo cuối ngày", url: "/home/manager/report" },
      ],
    },
  ],
};

const menuItems = [salesModule, inventoryModule, hrModule, reportModule];

function CustomDrawerContent(props) {
  const infoDetail = useSelector((state) => state.info);

  return (
    <DrawerContentScrollView {...props} safeArea>
      {/* <BranchSelectAppBar store_uuid={infoDetail.store.uuid} /> */}
      <VStack space="3" my="3" mx="3">
        {menuItems.map(((module, index) =>(
            <MenuGroup key={index} item={module} indexOpen={props.state.index} navigation={props.navigation}/>
        )))}
      </VStack>
    </DrawerContentScrollView>
  );
}

const MenuGroup = (props) =>{
  const { item,indexOpen ,navigation} = props;

  return(
    <VStack space="2">
      <Text fontWeight="500" fontSize={14} px="2" color="gray.500">
        {item.title}
      </Text>
      {item.children.map((menuItem, index) => (
        <MenuItem key={menuItem.id} item={menuItem}  collapse={true} indexOpen={indexOpen} navigation={navigation}/>
      ))}

     <Center><Divider w="90%"/></Center>
    </VStack>
  )
}

const MenuItem  = ({item,indexOpen,navigation}) =>{
  return  (
    <Pressable 
        key={item.id}
        mx="1"px="2" py="2.5" rounded="lg"
        bg={ item.id   === indexOpen +1? "secondary.100"  : "transparent" }
        onPress={(event) => {  navigation.navigate(item.name); }}
      >
        <HStack space="4" alignItems="center">
          <Image style={{width:27, height:27}} source={item.icon} />
          
          <Text  fontSize="md" fontWeight={ item.id  === indexOpen +1 ? "700" : null }    color={ item.id   === indexOpen +1 ? "secondary.500" : "gray.700" } >
              {item.title}
          </Text>
        </HStack>
    </Pressable>
  )
}
const HomeScreen = ({ navigation, route }) => {
  const infoDetail = useSelector((state) => state.info);
  const dispatch = useDispatch();
  const loadingData = async () => {
    try {
      let response = await branchApi.getBranches(infoDetail.store.uuid);
      // setBranches(response.data);
      // setSelectedBranch(response.data[0]);
      dispatch(
        infoActions.setBranch({
          // uuid: response.data[0].uuid,
          // name: response.data[0].name,
          uuid: response.data.data[0].uuid,
          name: response.data.data[0].name,
        })
      );


      // GET ALL PRODUCT SAVE TO REDUX
      const response_product = await productApi.getProductsOfBranch( infoDetail.store.uuid,  infoDetail.branch.uuid,{ page: 0,   limit: 1000});
      console.warn(response_product.data.data)
      dispatch(
        dataActions.setProduct(response_product.data.data)
      );


    }catch(err) {
      // alert(JSON.stringify(err))
    }
  };

  React.useEffect(() => {
    loadingData(); 
   

  }, [infoDetail.store.uuid]);

  React.useEffect(() => {
    loadingData(); 

  }, []);

 
  return (
    <Drawer.Navigator
      screenOptions={{ drawerStyle: {  width: 235, } }}
      drawerContent={(props) => <CustomDrawerContent {...props} />
    }
     initialRouteName="InventoryOrder"
    >
      <Drawer.Screen name="Cart" component={Cart}  options={{ title: "Giỏ Hàng"}}/>
      <Drawer.Screen name="Invoice" component={Invoice} options={{ title: "Hóa Đơn",headerShown: false}} />
      <Drawer.Screen name="InvoiceReturn" component={InvoiceReturn} options={{ title: "Đơn Trả",headerShown: false}}/>
      <Drawer.Screen name="Import" component={Import}options={{ title: "Nhập Hàng",headerShown: false}} />
      <Drawer.Screen name="Inventory" component={Inventory} options={{ title: "Sản phẩm",headerShown: false}}/>
      <Drawer.Screen name="InventoryOrder" component={InventoryOrder} options={{ title: "Đơn Nhập Hàng",headerShown: false}}/>
      <Drawer.Screen name="InventoryReturnOrder" component={InventoryReturnOrder} options={{ title: "Đơn Trả Hàng Nhập",headerShown: false}}/>
      <Drawer.Screen name="OrderProductList" component={OrderProductList} options={{ title: "Đặt Hàng"}}/>
      <Drawer.Screen name="CheckHistory" component={CheckHistory} options={{ title: "Kiểm Kho"}}/>
      <Drawer.Screen name="Supplier" component={Supplier} options={{ title: "Nhà Cung Cấp",headerShown: false}}/>
      <Drawer.Screen name="Employee" component={Employee}options={{ title: "Nhân Viên",headerShown: false}} />
      <Drawer.Screen name="Schedule" component={Schedule} options={{ title: "Ca Làm Việc"}}/>
      <Drawer.Screen name="History" component={History} options={{ title: "Lịch Sử Hoạt Động"}}/>
      <Drawer.Screen name="Branch" component={Branch} options={{ title: "Cửa Hàng"}}/>
      <Drawer.Screen name="Customer" component={Customer} options={{ title: "Khách Hàng",headerShown: false}}/>
      <Drawer.Screen name="Setting" component={Setting} options={{ title: "Cài đặt"}}/>
      <Drawer.Screen name="Report" component={Report} options={{ title: "Thống Kê"}}/>
     
 

    </Drawer.Navigator>

  )
}

export default HomeScreen


// function BranchSelectAppBar({ store_uuid }) {
//   const [selectedBranch, setSelectedBranch] = React.useState({});
//   const [branches, setBranches] = React.useState([]);
//   const dispatch = useDispatch();

//   const handleChange = (value) => {
//     setSelectedBranch(value);
//     dispatch(
//       infoActions.setBranch({
//         uuid: value.uuid,
//         name: value.name,
//       })
//     );
//   };

//   const loadingData = async () => {
//     let response = await branchApi.getBranches(store_uuid);
//     setBranches(response.data);
//     setSelectedBranch(response.data[0]);
//     dispatch(
//       infoActions.setBranch({
//         uuid: response.data[0].uuid,
//         name: response.data[0].name,
//       })
//     );
//   };

//   React.useEffect(() => {
//     loadingData();
//   }, [store_uuid]);

//   const renderMenuItem = () => {
//     return branches.map((branch) => {
//       // return <MenuItem value={branch}>{branch.name}</MenuItem>;
//       return <Select.Item label={branch.name} value={branch} />
//     });
//   };


//   let [service, setService] = React.useState("");


//   return (
//     // <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
//     //   <InputLabel>Chi nhánh</InputLabel>
//     //   <Select value={selectedBranch} label="Chi nhánh" onChange={handleChange}>
//     //     {renderMenuItem()}
//     //   </Select>
//     // </FormControl>
    
//         <Select selectedValue={selectedBranch} minWidth="200"  placeholder="Chi nhánh" _selectedItem={{ bg: "teal.600", endIcon: <Icon name="check" size="5" /> }} mt={1}
//          onValueChange={handleChange}>
//          {renderMenuItem()}
//         </Select>

//   );
// }
















// {/* <Box px="4">
//           <Text bold color="gray.700">
//             Chủ cửa hàng
//           </Text>
//           <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
//             Lý Quốc Hải
//           </Text>
//         </Box> */}


// // function Home({ navigation }) {
// //   return (
// //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //       <Button
// //         onPress={() => navigation.navigate('Login')}
// //         title="Go to notifications"
// //       />
// //     </View>
// //   );
// // }

// // function NotificationsScreen({ navigation }) {
// //   return (
// //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //       <Button onPress={() => navigation.goBack()} title="Go back home" />
// //     </View>
// //   );
// // }