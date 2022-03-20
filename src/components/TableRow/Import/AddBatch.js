import React , {useState} from 'react'
import {Modal,FormControl,Input, Heading, HStack, Button} from 'native-base'
import DatePicker from '../../DatePicker/DatePicker'
import ThousandInput from '../../Input/ThousandInput';
const AddBatch = ({handleSubmit,handleClose,row}) => {
    const [batch, setBatch] = useState({
        id: new Date().toString(),
        batch_code: "",
        additional_quantity: 1,
        expiry_date: new Date().toISOString().substring(0, 10),
        position: "",
        });

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    return (
    <Modal isOpen={true} onClose={handleClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Thêm lô mới</Modal.Header>
          <Modal.Body> 

            <FormControl mt="2">
              <FormControl.Label>Ngày hết hạn</FormControl.Label>
              <DatePicker 
                    isDatePickerVisible={isDatePickerVisible}
                    setDatePickerVisibility={setDatePickerVisibility}
                    // value={formik.values.date_of_birth}
                    value={batch.expiry_date} 
                    label={"Ngày hết hạn"}   
                    onChange={(val) => {
                        setBatch({ ...batch, expiry_date: val });
                    }}
                />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Số lượng nhập</FormControl.Label>
              <ThousandInput  
                placeholder="Số lượng nhập" 
                // isInvalid={formik.touched.minTotalAmount && formik.errors.minTotalAmount}
                value={batch.additional_quantity} 
                handleChange={(val => {
                    const value = Number(val);
                    if (value < 0) {
                      return;
                    } else {
                      setBatch({ ...batch, additional_quantity: value });
                    }
                  })}  
                // handleBlur={formik.handleBlur("minTotalAmount")} 
                // errorMess={formik.touched.minTotalAmount ? formik.errors.minTotalAmount : null}
            />
  
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>Vị trí</FormControl.Label>
                <Input 
                    size="md"
                    p={2}
                    value={batch.position}
                    onChangeText={(value) => setBatch({ ...batch, position: value })}
                    placeholder={"Vị trí"}  
                />
            </FormControl>

            <HStack mt={5}space={3} justifyContent="flex-end">
                <Button colorScheme="secondary" onPress={handleClose}>Huỷ</Button>
                <Button  onPress={()=>{handleSubmit(batch); handleClose();}} disabled={!batch.additional_quantity}>Thêm</Button> 
            </HStack>  
            
          </Modal.Body> 
            
        </Modal.Content>
    </Modal>
  )
}

export default AddBatch