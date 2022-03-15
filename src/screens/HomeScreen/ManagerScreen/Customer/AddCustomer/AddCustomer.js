import React from 'react'
import { useSelector} from 'react-redux'
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, VStack} from "native-base";

//import project
import customerApi from "../../../../../api/customerApi";
import BackNavBar from '../../../../../components/NavBar/BackNavBar';
import FormInput from "../../../../../components/FormInput/FormInput"


const AddCustomer = ({navigation, route}) => {
    const info = useSelector(state => state.info)
    const {row,isEdit} = route.params;
    const store_uuid = info.store.uuid

    const customerFormik = useFormik({
        initialValues: {
          name: isEdit?row.name:"",
          email: isEdit?row.email:"",
          phone: isEdit?row.phone:"",
          address: isEdit?row.address:"",
          paymentInfo:isEdit?row.paymentInfo:"",
        },
        validationSchema: Yup.object({
          name: Yup.string().required("Nhập tên khách hàng"),
          phone: Yup.string()
            .length(10, "Số điện thoại không chính xác")
            .required("Nhập số điện thoại").matches(/^\d+$/),
        //   address: Yup.string().required("Nhập địa chỉ khách hàng"),
        }),
      })

  return (
      <>
    <BackNavBar navigation={navigation} title={!isEdit?"Thêm khách hàng":"Chỉnh sửa khách hàng"} />
    <VStack mx={4} space={4}>
    <FormInput 
        placeholder="Tên khách hàng*"
        isInvalid={customerFormik.touched.name && customerFormik.errors.name}
        value={customerFormik.values.name}
        handleChange={customerFormik.handleChange("name")}
        handleBlur={customerFormik.handleBlur("name")}
        errorMess={customerFormik.touched.name ? customerFormik.errors.name : null}
    />
    <FormInput 
        placeholder="Số điện thoại*"
        keyboardType={"number-pad"}
        isInvalid={customerFormik.touched.phone && customerFormik.errors.phone}
        value={customerFormik.values.phone}
        handleChange={customerFormik.handleChange("phone")}
        handleBlur={customerFormik.handleBlur("phone")}
        errorMess={customerFormik.touched.phone ? customerFormik.errors.phone : null}
    />
    <FormInput 
        placeholder="Địa chỉ"
        isInvalid={customerFormik.touched.address && customerFormik.errors.address}
        value={customerFormik.values.address}
        handleChange={customerFormik.handleChange("address")}
        handleBlur={customerFormik.handleBlur("address")}
        errorMess={customerFormik.touched.address ? customerFormik.errors.address : null}
    />
     <FormInput 
        placeholder="Email"
        keyboardType={"email-address"}
        isInvalid={customerFormik.touched.email && customerFormik.errors.email}
        value={customerFormik.values.email}
        handleChange={customerFormik.handleChange("email")}
        handleBlur={customerFormik.handleBlur("email")}
        errorMess={customerFormik.touched.email ? customerFormik.errors.email : null}
    />
     <FormInput 
        placeholder="Thông tin thanh toán"
        isInvalid={customerFormik.touched.paymentInfo && customerFormik.errors.paymentInfo}
        value={customerFormik.values.paymentInfo}
        handleChange={customerFormik.handleChange("paymentInfo")}
        handleBlur={customerFormik.handleBlur("paymentInfo")}
        errorMess={customerFormik.touched.paymentInfo ? customerFormik.errors.paymentInfo : null}
    />
    </VStack>

    <Button
        size="lg"
        onPress={async () => { 
        let body = {
            name: customerFormik.values.name,
            email: customerFormik.values.email,
            phone: customerFormik.values.phone,
            address: customerFormik.values.address,
            payment_info: customerFormik.values.paymentInfo,
        };
        try {
            console.log("isEditres",isEdit)
            // const response = await customerApi.createCustomer(store_uuid, body)
            const response = !isEdit? await customerApi.createCustomer(store_uuid, body) :
                await customerApi.deleteCustomer(store_uuid, row.uuid, body)
                console.log("isEdit",isEdit)
            if(!isEdit){ navigation.goBack()} else{navigation.navigate('CustomerDetailScreen', {dataEdit:{...body, uuid:row.uuid}}) }
        //   dispatch(statusAction.successfulStatus("Tạo khách hàng thành công"));
        } catch (err) {
        //   dispatch(statusAction.successfulStatus("Tạo khách hàng thất bại"));
        }

        }}
        style={{position: 'absolute', left: 15, right: 15, bottom: 15, }}
        isDisabled = {!(customerFormik.isValid && Object.keys(customerFormik.touched).length > 0)}
    >

       { !isEdit? "THÊM KHÁCH HÀNG":"LƯU THAY ĐỔI" }
    </Button>

    </>


  )
}

export default AddCustomer