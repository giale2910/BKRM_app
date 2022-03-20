import React , {useState}from 'react'
import {Modal,FormControl,Input, HStack, Button, Box,Text,VStack} from 'native-base'
import ThousandInput from '../../Input/ThousandInput';
import SearchShowValue from "../../SearchBar/SearchShowValue"
import * as _ from "lodash";

const SelectBatch = ({handleSubmit,handleClose,row}) => {

  const [selectedBatches, setSelectedBatches] = useState([]);

    const batch = [{id: 15, product_id: 260, store_id: 5, batch_code: 'L0002', expiry_date: '2022-03-22 00:00:00',branch_id:46,quantity:2},
    {id: 16, product_id: 260, store_id: 5, batch_code: 'L0003', expiry_date: '2022-03-19 00:00:00',branch_id:46, quantity:5}
  ]

  const handleSelect = (value) =>{
    if (value) {
        setSelectedBatches(
          _.uniqBy(
            [
              ...selectedBatches,
              ...[{ ...value, additional_quantity: 0, is_new: false }],
            ],
            "batch_code"
          )
        );
      }
  }

  return (
    <Modal isOpen={true} onClose={handleClose}>
        <Modal.Content maxWidth="400px">
          {/* <Modal.CloseButton /> */}
          <Modal.Header>{`Chọn lô của ${row.product_code} - ${row.name}`}</Modal.Header>
          <Modal.Body>

            {/* <SearchShowValue options={row.batches} /> */}
            <SearchShowValue options={batch} handleSelect={handleSelect}/>

            {selectedBatches.map((batch) => {
            return (

            <Box borderWidth={1} borderRadius={5} p={2} mb={2} borderColor={'#b6b6b6'} mt={2}>
                <VStack justifyContent='space-between'>
                    <Text>{`${batch?.batch_code} - ${  batch?.expiry_date ? batch?.expiry_date : "" }`}</Text>
                    <Text>{`Tồn kho: ${batch?.quantity}`}</Text>
                    <HStack alignItems='center' justifyContent='space-between'>
                    <Text bold mr={3}> Số lượng nhập: </Text>

                    <ThousandInput  
                        placeholder="Số lượng nhập" 
                        variant="filled"
                        value={batch.additional_quantity} 
                        handleChange={(val) => {
                            if (Number(val) < 0) return;
                            const newSelectedList = selectedBatches.map(
                            (selectedBatch) => {
                                if (selectedBatch.batch_code === batch.batch_code) {
                                return {
                                    ...selectedBatch,
                                    additional_quantity: Number(val),
                                };
                                } else {
                                return selectedBatch;
                                }
                            }
                            );
                            setSelectedBatches(newSelectedList);
                        }}
                        
                    />
                    </HStack>
    
                </VStack>
              </Box>
            );
            })}



            <HStack mt={5}space={3} justifyContent="flex-end">
                <Button colorScheme="secondary" onPress={handleClose}>Huỷ</Button>
                <Button  onPress={()=>{
                    const nonZeroBatch = selectedBatches.filter(
                        (batch) => batch.additional_quantity
                      );

                    handleSubmit(nonZeroBatch); 
                    handleClose();}} 
                    >Thêm</Button> 
            </HStack>  

          </Modal.Body>     
        </Modal.Content>
    </Modal>
  )
}

export default SelectBatch




       {/* <Input
                  type="number"
                  value={batch.additional_quantity}
                  onChange={(e) => {
                    if (Number(e.target.value) < 0) return;
                    const newSelectedList = selectedBatches.map(
                      (selectedBatch) => {
                        if (selectedBatch.batch_code === batch.batch_code) {
                          return {
                            ...selectedBatch,
                            additional_quantity: Number(e.target.value),
                          };
                        } else {
                          return selectedBatch;
                        }
                      }
                    );
                    setSelectedBatches(newSelectedList);
                  }}
                /> */}