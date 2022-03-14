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
  
    Input
  } from "native-base";
  import { useSelector } from "react-redux";

import BackNavBar from "../../components/NavBar/BackNavBar"
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productApi from "../../api/productApi";


const SearchScreen = ({navigation, route}) => {
  // const { handleSearchBarSelect  } = route.params;
  

  const [options, setOptions] = React.useState([]);
   // redux
   const info = useSelector((state) => state.info);
   const store_uuid = info.store.uuid;
   const branch_uuid = info.branch.uuid;
 
   const loadingData = async ( searchKey) => {
     const response = await productApi.searchBranchProduct(
       store_uuid,
       branch_uuid,
       searchKey
     );
     console.log("response.data",response.data.data)
     setOptions(response.data.data);
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
          onChangeText={val => loadingData(val)}
          // onChange={(event, value) => {
          //   if (value) {
          //     // setSelectedOption(value);
          //     handleSearchBarSelect(value);
          //   }
          // }}
          
      /> 
    </BackNavBar>
    
    <ScrollView style={styles.scrollView}>
      {options.map((item =>{
        return(
          <Text>{item.name}</Text>
        )
      }))}
    </ScrollView>
</>
  )
}

export default SearchScreen


const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 18,
  },

});
