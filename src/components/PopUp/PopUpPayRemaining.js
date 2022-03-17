import React from 'react'
import {Modal ,FormControl,Button,Input,Select, Text, HStack,Heading,VStack} from "native-base"
import Icon from "react-native-vector-icons/FontAwesome";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { statusAction } from "../../store/slice/statusSlice";
import ThousandInput from '../Input/ThousandInput';
const PopUpPayRemaining = (props) => {

    const { open, editApiCall, reloadDetail,title } = props;
    const handleClose = () => {
        props.handleClose();
        formik.resetForm();
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { pay: props.debt },
        validationSchema: Yup.object({
            pay: Yup.number()
            .required("Vui lòng nhập số tiền")
            .lessThan(props.debt + 1, "Tiền trả phải ít hơn nợ")
            .moreThan(0, "Tiền trả phải lớn hơn 0"),
        }),
    });

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    handleClose();
    try {
      const response = await editApiCall(store_uuid, branch_uuid, props.uuid, {
        paid_amount: Number(formik.values.pay) + props.paid,
        status: formik.values.pay === props.debt ? "closed" : "debt",
      });
    //   dispatch(statusAction.successfulStatus("Trả thêm tiền thành công"));
    //   props.onReload();

      reloadDetail();
    } catch (error) {
      console.log(error);
    //   dispatch(statusAction.failedStatus("Trả thêm tiền thất bại"));
    }
  };


  return (
    <Modal isOpen={open} onClose={props.handleClose}>
        <Modal.Content p={3} mb={4} >
          {/* <Modal.CloseButton /> */}
          <Modal.Body>
          <Heading size="md" mb={7}>{title} </Heading>
        <VStack space={3}>
          <HStack>
            <Text bold w="40%"color='black' >Đã trả :</Text>
            <Text fontSize={16}  >{props.paid.toLocaleString()}</Text>
        </HStack> 
        <HStack>
            <Text bold w="40%"color='black' >Còn nợ :</Text>
            <Text fontSize={16}  >{props.debt.toLocaleString()}</Text>
        </HStack> 
        <HStack  alignItems='center'>
            <Text bold w="40%"color='black' >Trả lần này :</Text>
            <ThousandInput  
           
                variant="underlined"
                placeholder="Số tiền muốn trả" 
                isInvalid={formik.touched.pay && formik.errors.pay}
                value={formik.values.pay} 
                handleChange={formik.handleChange("pay")}  
                handleBlur={formik.handleBlur("pay")} 
                errorMess={formik.touched.pay ? formik.errors.pay : null}
            />
        </HStack> 
           
        <HStack>
            <Text bold w="40%"color='black' >Còn lại :</Text>
            <Text fontSize={16}  >{(props.debt - formik.values.pay).toLocaleString()}</Text>
        </HStack> 
        
        </VStack>
          </Modal.Body>
          <HStack mt={3}space={3} justifyContent="flex-end">
            <Button colorScheme="secondary" onPress={props.handleClose}>Huỷ</Button>
            <Button  onPress={handleSubmit} disabled={!(formik.isValid )}>Xác nhận</Button>
        </HStack>
       
        </Modal.Content>
      </Modal>
  )
}

export default PopUpPayRemaining


