import React , { useState, useEffect }from 'react'
import { useSelector} from 'react-redux'
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, VStack} from "native-base";

//import project
import supplierApi from "../../../../../api/supplierApi";
import BackNavBar from '../../../../../components/NavBar/BackNavBar';
import FormInput from "../../../../../components/Input/FormInput"


const AddSupplier = ({navigation, route}) => {
    const info = useSelector(state => state.info)
    const {row,isEdit} = route.params;
    const store_uuid = info.store.uuid
    const [image, setImage] = useState([]);
    const supplierFormik = useFormik({
        initialValues: {
          name: isEdit?row.name:"",
          email:isEdit?row.email:"",
          phone:isEdit?row.phone:"",
          address: isEdit?row.address:"",
          company:isEdit?row.company:"",
          paymentInfo:isEdit?row.paymentInfo:"",
        },
        validationSchema: Yup.object({
          name: Yup.string().required("Nhập tên nhà cung cấp"),
          phone: Yup.string()
            .length(10, "Số điện thoại không chính xác")
            .required("Nhập số điện thoại").matches(/^\d+$/),
          address: Yup.string().required("Nhập địa chỉ nhà cung cấp"),
        }),
      })


  return (
      <>
    <BackNavBar navigation={navigation} title={!isEdit?"Thêm nhà cung cấp":"Chỉnh sửa nhà cung cấp"} />
    <VStack mx={4} space={4}>
    <FormInput 
        placeholder="Tên nhà cung cấp*"
        isInvalid={supplierFormik.touched.name && supplierFormik.errors.name}
        value={supplierFormik.values.name}
        handleChange={supplierFormik.handleChange("name")}
        handleBlur={supplierFormik.handleBlur("name")}
        errorMess={supplierFormik.touched.name ? supplierFormik.errors.name : null}
    />
    <FormInput 
        placeholder="Số điện thoại*"
        keyboardType={"number-pad"}
        isInvalid={supplierFormik.touched.phone && supplierFormik.errors.phone}
        value={supplierFormik.values.phone}
        handleChange={supplierFormik.handleChange("phone")}
        handleBlur={supplierFormik.handleBlur("phone")}
        errorMess={supplierFormik.touched.phone ? supplierFormik.errors.phone : null}
    />
    <FormInput 
        placeholder="Địa chỉ*"
        isInvalid={supplierFormik.touched.address && supplierFormik.errors.address}
        value={supplierFormik.values.address}
        handleChange={supplierFormik.handleChange("address")}
        handleBlur={supplierFormik.handleBlur("address")}
        errorMess={supplierFormik.touched.address ? supplierFormik.errors.address : null}
    />
     <FormInput 
        placeholder="Email"
        keyboardType={"email-address"}
        isInvalid={supplierFormik.touched.email && supplierFormik.errors.email}
        value={supplierFormik.values.email}
        handleChange={supplierFormik.handleChange("email")}
        handleBlur={supplierFormik.handleBlur("email")}
        errorMess={supplierFormik.touched.email ? supplierFormik.errors.email : null}
    />
    <FormInput 
        placeholder="Tên công ty"
        isInvalid={supplierFormik.touched.company && supplierFormik.errors.company}
        value={supplierFormik.values.company}
        handleChange={supplierFormik.handleChange("company")}
        handleBlur={supplierFormik.handleBlur("company")}
        errorMess={supplierFormik.touched.company ? supplierFormik.errors.company : null}
    />
     <FormInput 
        placeholder="Thông tin thanh toán"
        isInvalid={supplierFormik.touched.paymentInfo && supplierFormik.errors.paymentInfo}
        value={supplierFormik.values.paymentInfo}
        handleChange={supplierFormik.handleChange("paymentInfo")}
        handleBlur={supplierFormik.handleBlur("paymentInfo")}
        errorMess={supplierFormik.touched.paymentInfo ? supplierFormik.errors.paymentInfo : null}
    />
    </VStack>

    <Button
        size="lg"
        // onPress={handleAddSupplier}
        onPress={async () => { 
        try {
            // var bodyFormData = new FormData();
            // bodyFormData.append("name", supplierFormik.values.name?.toString());
            // bodyFormData.append("email", supplierFormik.values.email?.toString());
            // bodyFormData.append("phone", supplierFormik.values.phone?.toString());
            // bodyFormData.append("payment_info", supplierFormik.values.paymentInfo?.toString());
            // bodyFormData.append("payment_info", supplierFormik.values.company?.toString());
            // bodyFormData.append("address", supplierFormik.values.address?.toString());
            // bodyFormData.append("image", image);

            let bodyFormData = {
                name: supplierFormik.values.name?.toString(),
                email: supplierFormik.values.email?.toString(),
                phone: supplierFormik.values.phone?.toString(),
                address:supplierFormik.values.address?.toString(),
                payment_info:supplierFormik.values.paymentInfo?.toString(),
                company:supplierFormik.values.company?.toString(),
            };
            if(!isEdit ){
          
                await supplierApi.createSupplier(
                    store_uuid,
                    bodyFormData
                  );
                navigation.goBack()
                //   dispatch(statusAction.successfulStatus("Tạo nhà cung cấp thành công"));
            }else{
                await supplierApi.updateSupplier(store_uuid, row.uuid, bodyFormData)
                navigation.navigate('SupplierDetailScreen', {dataEdit:{...bodyFormData, uuid:row.uuid}})
            } 
            // props.onReload();
          } catch (err) {
            // dispatch(statusAction.failedStatus("Tạo nhà cung cấp thất bại"));
            console.log(err);
          }

        }}
        style={{position: 'absolute', left: 15, right: 15, bottom: 15, }}
        isDisabled = {!(supplierFormik.isValid && Object.keys(supplierFormik.touched).length > 0)}
    >

       { !isEdit? "THÊM NHÀ CUNG CẤP":"LƯU THAY ĐỔI" }
    </Button>

    </>


  )
}

export default AddSupplier