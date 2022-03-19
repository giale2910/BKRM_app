import React, {useState} from 'react'
import {Modal, VStack,HStack,Text,Input,Stack,Button,Radio,Box,View,Divider,PresenceTransition,Center} from 'native-base'
import {calculateTotalQuantity} from "../../../../../util/util"
import ThousandInput from '../../../../../components/Input/ThousandInput'
import purchaseOrderApi from "../../../../../api/purchaseOrderApi";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from 'react-native';
import moment from "moment";


const ModalCartSummary = ({selectedIndex,showModal,setShowModal,cartData,total_amount,total_quantity,navigation,suppliers,handleSelectSupplier,handleDelete}) => {

const [value,setValue] =  useState(cartData.supplier?cartData.supplier.name:'')
const [discount, setDiscount]  =  useState(0)
const [paidAmmount, setPaidAmmount]  =  useState(total_amount)
const [paymentMethod, setPaymenMethod]  =  useState("cash")
const [isDelivery, setIsDelivery] = useState(false)

// const supplier
const [searchSupplier, setSearchSupplier] = useState(suppliers)
const [selected, setSelected] = useState(cartData.supplier?true:false)

const info = useSelector((state) => state.info);
const store_uuid = info.store.uuid;
const branch = info.branch;

const handleSearch = (value) => {
  setValue(value)
  if(selected === true) {setSelected(false)}  
}

console.log("selected",selected)

const handleConfirm = async() =>{
    let d = moment.now() / 1000;
    let orderTime = moment .unix(d) .format("YYYY-MM-DD HH:mm:ss", { trim: false });
    let body = {
      customer_uuid: cartData.supplier ? cartData.supplier.uuid : "",
      total_amount: total_amount.toString(),
      payment_method: paymentMethod,
      paid_amount: paidAmmount,
      discount: discount.toString(),
      status: Number(total_amount) - Number(discount) >=  Number(paidAmmount) ? "debt" : "closed",
     
      details: cartData.cartItem.map((item) => ({ ...item, discount: "0" })),
      creation_date: orderTime, 
      paid_date: orderTime,
      tax: "0",
      shipping: "0",
      delivery:isDelivery,
    }
    try {
        let res = await purchaseOrderApi.addInventory(  store_uuid,  branch.uuid,  body );
        // handlePrint();
        handleDelete(selectedIndex);
        setShowModal(false)
      } catch (err) {
        console.log(err);
    }
 }

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Thanh toán</Modal.Header>
          <Modal.Body>
            <HStack >
              <Input 
                  w="90%"
                  InputLeftElement={<Box pl={2} pt={5} ><MaterialIcons  name="search"  size={20}  color="grey"  /> </Box>} 
                  InputRightElement={<Box pr={3} pt={5} >{value? <MaterialIcons  name="cancel"  size={20}  color="lightgrey" onPress={()=>{setValue(''); if(selected){setSelected(false)}}}  /> :null} </Box> } 
                  h={10}
                  size="sm" p={1} variant="rounded" placeholder="Tìm khách hàng ..."  
                  // onSubmitEditing={e => setSearchKey(e.nativeEvent.text)}
                  onBlur={e => console.log(e.nativeEvent.text)}
                  returnKeyType="search"
                  onChangeText={(value)=>handleSearch(value)}
                  value={value}          
            /> 
            <Stack mt={2}>
              <MaterialIcons  name="add"  size={25}  color="grey" pt={-10}  />
          </Stack>
         </HStack>
    
         {value.length !== 0 && selected===false ?
         <PresenceTransition visible={value.length !== 0} initial={{ opacity: 0  }} animate={{ opacity: 1, transition: { duration: 250  } }}>
              <Box w="90%" borderWidth="1" borderColor="gray.100" bg='coolGray.100' shadow="2"  borderRadius={10} zIndex={100}>
                  {suppliers.map((s )=> {
                    console.log("s",s)
                    if(s.name.indexOf(value) > -1){
                      return (
                        <TouchableOpacity onPress={()=>{handleSelectSupplier(s); setValue(s.name + ' - '+  s.phone  ); setSelected(true)}  }>
                          <HStack  p={3}>
                            <Text >{s.phone} - {s.name} </Text>
                          </HStack>
                          <Divider />
                       </TouchableOpacity>
                      )
                    }
                  })}
             </Box>
        
        </PresenceTransition>:null}
      
            <VStack space={3}  mt={5}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Tổng SL sản phẩm ({cartData.cartItem.length.toLocaleString()}) </Text>
                <Text color="blueGray.400">{total_quantity}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Tổng tiền hàng</Text>
                <Text color="blueGray.400">{total_amount.toLocaleString()}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Giảm giá</Text>
                <Stack w="25%"><ThousandInput variant={"underlined"}textAlign="right" value={discount} handleChange={(val)=>{setDiscount(val); setPaidAmmount(Number(total_amount)-Number(val))}}  isSummary={true}/></Stack>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Tổng tiền</Text>
                <Text color="green.500" bold>{(total_amount - discount).toLocaleString()}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Khách thanh toán</Text>
                <Stack w="25%"><ThousandInput variant={"underlined"}textAlign="right" value={paidAmmount} handleChange={setPaidAmmount} isSummary={true}/></Stack>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Tiền thối</Text>
                <Text color="blueGray.400">{(total_amount- discount - paidAmmount).toLocaleString()}</Text>
              </HStack>
              </VStack>
               <Radio.Group defaultValue="cash" value={paymentMethod} onChange={setPaymenMethod} mt={3}>
                    <HStack >
                        <Radio value="card"  size="sm" ml="28%" my={1} mr={2}>Thẻ </Radio>
                        <Radio value="cash"  size="sm" my={1}> Tiền mặt</Radio>
                    </HStack>
                </Radio.Group>  
                <Checkbox
                    value="danger"
                    colorScheme="pink"
                    style={{ alignSelf: "flex-end" }}
                    checked={isDelivery}
                    onChange={(value) => setIsDelivery(value)}
                  >
                    Giao hàng
                  </Checkbox>
                  
              <Button mt={6} colorScheme="secondary" onPress={handleConfirm} >Bán hàng</Button>
              
          </Modal.Body>
          
        </Modal.Content>
        
      </Modal>
  )
}

export default ModalCartSummary