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
    Input
  } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SearchBar = ({setSearchKey}) => {
  const [valueSearch, setValueSearch] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    // setSearchKey(valueSearch)
}, [search]);

  return (
    <Center mb="4" mt="-3">
    <Input  
       
          w="90%"
          InputLeftElement={<Box pl={2} pt={5} ><MaterialIcons  name="search"  size={25}  color="grey"  /> </Box>} 
          InputRightElement={<Box pr={3} pt={5}><Icon  name="barcode"  size={25}  color="grey"  /> </Box>} 
          h={12}
          size="md" p={3} variant="rounded" placeholder="Tìm sản phẩm (mã sp, tên)"  
          onChangeText={val => {
            setValueSearch(val)
          }}
          onKeyPress={e => {
            if (e.nativeEvent.key ===' ') {
              setSearch(valueSearch.length)
            }
          }}
         
              
         
     /> 
     </Center>
  )
}

export default SearchBar