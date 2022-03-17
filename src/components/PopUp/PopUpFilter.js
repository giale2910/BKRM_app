import React , { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import {Modal ,FormControl,Button,Input,Select,HStack,Box, Heading} from "native-base"
import Icon from "react-native-vector-icons/FontAwesome";
import { useFormik } from 'formik';
import DatePicker from '../../components/DatePicker/DatePicker'
import ThousandInput from "../../components/Input/ThousandInput"


const PopUpFilter = ({showModalFilter,setShowModalFilter,query,setQuery,handleRemoveFilter,label}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const formik = useFormik({
        initialValues: query,
        onSubmit: async values => {
            setShowModalFilter(false)
            setQuery(values)
        },
      });

  return (
    <Modal isOpen={showModalFilter} onClose={() => setShowModalFilter(false)}>
            <Modal.Content p={3} mb={4} >
          {/* <Modal.CloseButton /> */}
          <Modal.Body>

        {/* 1.Ngay from-to */}         
          <Heading size="xs" mb={2}>{label[0]}</Heading>
          <HStack mb={3} alignItems="center" justifyContent="space-between">
                <Box w="48%">
                    <DatePicker 
                        isDatePickerVisible={isDatePickerVisible}
                        setDatePickerVisibility={setDatePickerVisibility}
                        // value={formik.values.date_of_birth}
                        value={formik.values.startDate} 
                        formik={formik}
                        name={"startDate"}
                        label={"Từ ngày"}   
                    />
                </Box>
                <Box w="48%">
                    <DatePicker 
                    isDatePickerVisible={isDatePickerVisible}
                    setDatePickerVisibility={setDatePickerVisibility}
                    value={formik.values.endDate}
                    formik={formik}
                    name={"endDate"}
                    label={"Đến ngày"} 
                    />
                </Box>
        </HStack>

        {/* 2.Tien from-to*/}
        <Heading size="xs" mb={2}>{label[1]}</Heading>

        <HStack mb={3} alignItems="center" justifyContent="space-between">
            <Box w="48%">
                <ThousandInput  
                    placeholder="Từ" 
                    isInvalid={formik.touched.minTotalAmount && formik.errors.minTotalAmount}
                    value={formik.values.minTotalAmount} 
                    handleChange={formik.handleChange("minTotalAmount")}  
                    handleBlur={formik.handleBlur("minTotalAmount")} 
                    errorMess={formik.touched.minTotalAmount ? formik.errors.minTotalAmount : null}
                />
        </Box>
        <Box w="48%">
            <ThousandInput  
                placeholder="Đến" 
                isInvalid={formik.touched.maxTotalAmount && formik.errors.maxTotalAmount}
                value={formik.values.maxTotalAmount} 
                handleChange={formik.handleChange("maxTotalAmount")}  
                handleBlur={formik.handleBlur("maxTotalAmount")} 
                errorMess={formik.touched.maxTotalAmount ? formik.errors.maxTotalAmount : null}
            />
        </Box>
        </HStack >

      {/* 3.Giảm giá from-to*/}
      {label.length > 2  ? 
      <>
      <Heading size="xs" mb={2}>{label[2]}</Heading>
        <HStack  mb={3} alignItems="center" justifyContent="space-between">
            <Box w="48%">
                <ThousandInput  
                    placeholder="Từ" 
                    isInvalid={formik.touched.minDiscount && formik.errors.minDiscount}
                    value={formik.values.minDiscount} 
                    handleChange={formik.handleChange("minDiscount")}  
                    handleBlur={formik.handleBlur("minDiscount")} 
                    errorMess={formik.touched.minDiscount ? formik.errors.minDiscount : null}
                />
        </Box>
        <Box w="48%">
            <ThousandInput  
                placeholder="Đến" 
                isInvalid={formik.touched.maxDiscount && formik.errors.maxDiscount}
                value={formik.values.maxDiscount} 
                handleChange={formik.handleChange("maxDiscount")}  
                handleBlur={formik.handleBlur("maxDiscount")} 
                errorMess={formik.touched.maxDiscount ? formik.errors.maxDiscount : null}
            />
        </Box>
     </HStack>
     </>
     :null}

        {/* 4.Trang thai */}
        <Heading size="xs" mb={2}>Trạng thái:</Heading>
        <Select   mb={3} placeholder="Trạng thái"size={"lg"}p={3} _selectedItem={{ bg: "gray.200", endIcon: <Icon color="black" name="check"  size={15} />}} 
            selectedValue={formik.values.status}
            onValueChange={formik.handleChange("status")}
            >
                <Select.Item label="Còn nợ" value="debt" />
                <Select.Item label="Trả đủ" value="closed" />
        </Select>

        {/* 5.Pttt */}

        <Heading size="xs" mb={2}>Phương thức thanh toán:</Heading>
        <Select   mb={3} placeholder="Phương thức thanh toán:"size={"lg"}p={3} _selectedItem={{ bg: "gray.200", endIcon: <Icon color="black" name="check"  size={15} />}} 
            selectedValue={formik.values.paymentMethod}
            onValueChange={formik.handleChange("paymentMethod")}
        >
            <Select.Item label="Thẻ" value="card" />
            <Select.Item label="Tiền mặt" value="cash" />
        </Select>
        
        {query.minDiscount !== '' || query.maxDiscount !== '' ||query.minTotalAmount !== '' ||query.maxTotalAmount !== ''||
        query.startDate !== '' || query.endDate !== '' || query.status !== '' || query.paymentMethod !== '' 
        ?
        <HStack space={3} justifyContent="flex-end">
            <Button colorScheme="secondary" onPress={()=>{handleRemoveFilter(); setShowModalFilter(false)}}>Bỏ lọc</Button>
            <Button  onPress={formik.handleSubmit}>Lọc</Button>
        </HStack>:
         <Button onPress={formik.handleSubmit}>Lọc</Button>
         }
        </Modal.Body>  
    </Modal.Content>
    </Modal>
  )
}

export default PopUpFilter