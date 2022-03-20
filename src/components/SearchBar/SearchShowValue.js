import React, {useState} from 'react'
import {Modal, VStack,HStack,Text,Input,Stack,Button,Radio,Box,View,Divider,PresenceTransition,Center} from 'native-base'
import { TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as _ from "lodash";

const SearchShowValue = ({options,handleSelect}) => {
    const [value,setValue] =  useState('')
    const [selected, setSelected] = useState(false)
    const [openSelect , setOpenSelect ]= useState(false)

    const toggleSelect = () => {
      setOpenSelect(!openSelect)
    }


  return (
    <>
        <HStack >
            <Input 
                w="100%"
                  InputLeftElement={<Box pl={2} pt={5} ><MaterialIcons  name="search"  size={20}  color="grey"  /> </Box>} 
                  InputRightElement={<Box pr={3} pt={5} >{value? <MaterialIcons  name="cancel"  size={20}  color="lightgrey" onPress={()=>{setValue(''); if(selected){setSelected(false)}}}  /> :<MaterialIcons  name="arrow-drop-down"  size={25}  color="grey" pt={-10} onPress={toggleSelect}  />} </Box> } 
                  value={value}
                  onChangeText={(val)=>{setValue(val);setOpenSelect(false)}}
                  h={10}
                  size="sm" p={1} variant="rounded" placeholder="Tìm mã lô ..."  
            />
        <Stack mt={2}>
        </Stack>
        </HStack>
    
         { (value.length !== 0 && selected===false) ?
         <PresenceTransition visible={value.length !== 0} initial={{ opacity: 0  }} animate={{ opacity: 1, transition: { duration: 250  } }}>
              <Box w="100%" borderWidth="1" borderColor="gray.100" bg='coolGray.100' shadow="2"  borderRadius={10} zIndex={100}>
                  {options.map((batch )=> {
                    if(batch.batch_code.indexOf(value) > -1 || batch?.expiry_date.indexOf(value) > -1  ){
                      return (
                        <TouchableOpacity key={batch?.batch_code} onPress={()=>{handleSelect(batch); setValue(`${batch?.batch_code} - ${ batch?.expiry_date ? batch?.expiry_date : "" } - Tồn kho: ${batch?.quantity}`); setSelected(true) ; setOpenSelect(false)}  }>
                          <HStack  p={3}>
                            <Text >{ `${batch?.batch_code} - ${ batch?.expiry_date ? batch?.expiry_date : "" } - Tồn kho: ${batch?.quantity}`} </Text>
                          </HStack>
                          <Divider />
                       </TouchableOpacity>
                      )
                    }
                  })}
                  
             </Box>
        
        </PresenceTransition>:null}

        { openSelect ?
         <PresenceTransition visible={options.length > 0} initial={{ opacity: 0  }} animate={{ opacity: 1, transition: { duration: 250  } }}>
         <Box w="100%" borderWidth="1" borderColor="gray.100" bg='coolGray.100' shadow="2"  borderRadius={10} >
            {options.map((batch )=> {       
              return (
                <TouchableOpacity key={batch?.batch_code} onPress={()=>{handleSelect(batch); setValue(`${batch?.batch_code} - ${ batch?.expiry_date ? batch?.expiry_date : "" } - Tồn kho: ${batch?.quantity}`); setSelected(true) ; setOpenSelect(false)}  }>
                  <HStack  p={3}>
                    <Text >{ `${batch?.batch_code} - ${ batch?.expiry_date ? batch?.expiry_date : "" } - Tồn kho: ${batch?.quantity}`} </Text>
                  </HStack>
                  <Divider />
                </TouchableOpacity>
              )
            
          })}
             
        </Box>
   
   </PresenceTransition>:null}

        </>
  )
}

export default SearchShowValue