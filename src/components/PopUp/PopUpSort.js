import React from 'react'
import {Modal ,FormControl,Button,Input,Select} from "native-base"
import Icon from "react-native-vector-icons/FontAwesome";

const PopUpSort = ({showModalSort,setShowModalSort,orderByOptions,orderBy,setOrderBy,sort,setSort,handleRemoveFilter}) => {

  return (
    <Modal isOpen={showModalSort} onClose={() => setShowModalSort(false)}>
        <Modal.Content p={3} mb={4} >
          {/* <Modal.CloseButton /> */}
          <Modal.Body>
                <FormControl mb={3} >                
                    <FormControl.Label>Sắp xếp theo</FormControl.Label>
                    <Select  placeholder="Sắp xếp theo" size={"lg"}p={3} _selectedItem={{ bg: "gray.200", endIcon: <Icon color="black"name="check" size={15} />}} mt={1}
                    selectedValue={orderBy}
                    onValueChange={setOrderBy}
                    >       
                        {orderByOptions?.map(o => <Select.Item  value={o.value} label={o.label} />)}
                    </Select>
                </FormControl>

                <FormControl mb={4}>                
                    <FormControl.Label>Theo thứ tự </FormControl.Label>
                    <Select  placeholder="Theo thứ tự " size={"lg"}p={3} _selectedItem={{ bg: "gray.200", endIcon: <Icon color="black"name="check" size={15} />}} mt={1}
                    selectedValue={sort}
                    onValueChange={setSort}
                    >
                        <Select.Item label="Tăng dần" value="asc" />
                        <Select.Item label="Giảm dần" value="desc" />
                    </Select>
                </FormControl>

                    {/* <Button onPress={() => {
                        setShowModalSort(false);
                        }}>
                    Bỏ sắp xếp
                </Button> */}
           
          </Modal.Body>
         
        </Modal.Content>
      </Modal>
  )
}

export default PopUpSort



 {/* <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModalSort(false);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
              setShowModalSort(false);
            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer> */}