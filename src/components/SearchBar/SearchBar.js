import React , {useState,useEffect} from 'react'
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
    Stack
  } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SearchBar = ({searchKey,setSearchKey}) => {

  const [value, setValue] = useState('')
  return (
    <Center mb="4" mt="-3">
    <Input 
          w="90%"
          InputLeftElement={<Box pl={2} pt={5} ><MaterialIcons  name="search"  size={25}  color="grey"  /> </Box>} 
          InputRightElement={<Box pr={3} pt={5} >{value? <MaterialIcons  name="cancel"  size={20}  color="lightgrey" onPress={()=>{setSearchKey("");setValue('')}}  /> :<Icon  name="barcode"  size={25}  color="grey"  />} </Box> } 
          h={12}
          size="md" p={3} variant="rounded" placeholder="Tìm sản phẩm (mã sp, tên)"  
          onSubmitEditing={e => setSearchKey(e.nativeEvent.text)}
          onBlur={e => console.log(e.nativeEvent.text)}
          returnKeyType="search"
          onChangeText={(value)=>setValue(value)}
          value={value}          
     /> 

     </Center>
  )
}

export default SearchBar

//   const [valueSearch, setValueSearch] = useState(false);
//   const [search, setSearch] = useState(false);

//   useEffect(() => {
//     console.log("hhello")
//     // setSearchKey(valueSearch)
// }, [search]);


  // onChangeText={val => {
      //   setValueSearch(val)
      // }}
      // onKeyPress={e => {
      //   if (e.nativeEvent.key === ' ') {
      //     setSearch(valueSearch.length)
      //   }
      // }}