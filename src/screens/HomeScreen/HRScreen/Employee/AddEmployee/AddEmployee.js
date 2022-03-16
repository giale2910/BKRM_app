import React , { useState, useEffect }from 'react'
import { useSelector} from 'react-redux'
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, VStack,Select,Divider, ScrollView,HStack,Box} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

//import project
import employeeApi from "../../../../../api/employeeApi";
import BackNavBar from '../../../../../components/NavBar/BackNavBar';
import FormInput from "../../../../../components/Input/FormInput"
import branchApi from "../../../../../api/branchApi";
import MultipleSelect from '../../../../../components/Select/MultipleSelect';
import ThousandInput from "../../../../../components/Input/ThousandInput"
import DatePicker from '../../../../../components/DatePicker/DatePicker'

const AddEmployee = ({navigation, route}) => {
    const {row,isEdit} = route.params;


    const info = useSelector(state => state.info)
    const store_uuid = info.store.uuid

    const [branches, setBranches] = React.useState([]);
    const [image, setImage] = React.useState("");
    const [imageToShow, setImageToShow] = React.useState("")

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    const formik = useFormik({
      initialValues: {
        uuid: "",
        name: "",
        user_name: "",
        phone: "",
        permissions: [],
        password: "",
        email: "",
        salary: "",
        salary_type: "",
        id_card_num: "",
        gender: "",
        date_of_birth: "",
        address: "",
        branches: [],
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required("Bắt buộc!"),
        user_name: Yup.string().required("Bắt buộc!"),
        password: Yup.string().required("Bắt buộc!"),
        branches: Yup.array().min(1, "Ít nhất một chi nhánh"),
        permissions: Yup.array().min(1, "Ít nhất một chức năng"),
      }),
      onSubmit: async (values, actions) => {
        let formData = new FormData();
  
        for (let value in values) {
          if (value === "permissions") {
            for (var i = 0; i < values["permissions"].length; i++) {
              formData.append("permissions[]", values["permissions"][i]);
            }
          } else if (value === "branches") {
            for (var i = 0; i < values["branches"].length; i++) {
              formData.append("branches[]", values["branches"][i]);
            }
          } else if (value === "password") {
            formData.append(value, values[value]);
            formData.append("password_confirmation", values[value]);
          } else {
            formData.append(value, values[value]);
          }
        }
  
        formData.append("image", image);
        formData.append("status", "active");
  
  
        try {
          const response = await employeeApi.createEmployee(
            store_uuid,
            formData
          );
          handleClose("Success");
        } catch (error) {
          handleClose("Failed");
        }
      },
    });
  
    useEffect(() => {
      const loadBranches = async () => {
        try {
          const response = await branchApi.getAllBranches(store_uuid);
          // setBranches(response.data);
          setBranches(response.data.data);
        } catch (err) {
          console.log(err);
        }
      };
      loadBranches();
  }, [store_uuid]);


  // console.log("formilk", formik.values)

  return (
      <>
    <BackNavBar navigation={navigation} title={!isEdit?"Thêm nhân viên":"Chỉnh sửa nhân viên"} />
    <ScrollView >
    <VStack mx={4} space={4}>
    <FormInput 
   
        placeholder="Tên nhân viên*"
        isInvalid={formik.touched.name && formik.errors.name}
        value={formik.values.name}
        handleChange={formik.handleChange("name")}
        handleBlur={formik.handleBlur("name")}
        errorMess={formik.touched.name ? formik.errors.name : null}
    />
 
    <HStack  alignItems="center" justifyContent="space-between">
        <Box w="48%">
            <FormInput 
            placeholder="Tên đăng nhập*"
            isInvalid={formik.touched.user_name && formik.errors.user_name}
            value={formik.values.user_name}
            handleChange={formik.handleChange("user_name")}
            handleBlur={formik.handleBlur("user_name")}
            errorMess={formik.touched.user_name ? formik.errors.user_name : null}
          />
      </Box>
      <Box w="48%">
          <FormInput 
            placeholder="Mật khẩu tài khoản*"
            isInvalid={formik.touched.password && formik.errors.password}
            value={formik.values.password}
            handleChange={formik.handleChange("password")}
            handleBlur={formik.handleBlur("password")}
            errorMess={formik.touched.password ? formik.errors.password : null}
        />    
      </Box>
    </HStack>

    <HStack  alignItems="center" justifyContent="space-between">
        <Box w="48%">
        <FormInput 
            placeholder="Số điện thoại"
            keyboardType={"number-pad"}
            isInvalid={formik.touched.phone && formik.errors.phone}
            value={formik.values.phone}
            handleChange={formik.handleChange("phone")}
            handleBlur={formik.handleBlur("phone")}
            errorMess={formik.touched.phone ? formik.errors.phone : null}
        />
      </Box>
      <Box w="48%">
          <FormInput 
            placeholder="CMND"
            keyboardType={"number-pad"}
            isInvalid={formik.touched.id_card_num && formik.errors.id_card_num}
            value={formik.values.id_card_num}
            handleChange={formik.handleChange("id_card_num")}
            handleBlur={formik.handleBlur("id_card_num")}
            errorMess={formik.touched.id_card_num ? formik.errors.id_card_num : null}
        />
      </Box>
    </HStack>

    <HStack  alignItems="center" justifyContent="space-between">
        <Box w="48%">
        <Select  placeholder="Giới tính" size={"lg"}p={3} _selectedItem={{ bg: "gray.200", endIcon: <Icon color="black"name="check" size={15} />}} mt={1}
          selectedValue={formik.values.gender}
          onValueChange={formik.handleChange("gender")}
          >
              <Select.Item label="Nam" value="male" />
              <Select.Item label="Nữ" value="female" />
      </Select>
      </Box>
      <Box w="48%">
          <DatePicker 
          isDatePickerVisible={isDatePickerVisible}
          setDatePickerVisibility={setDatePickerVisibility}
          value={formik.values.date_of_birth}
          formik={formik}
          name={"date_of_birth"}
          label={"Ngày sinh"}
          
        />
      </Box>
    </HStack>


    


    
    

    <FormInput 
        placeholder="Địa chỉ"
        isInvalid={formik.touched.address && formik.errors.address}
        value={formik.values.address}
        handleChange={formik.handleChange("address")}
        handleBlur={formik.handleBlur("address")}
        errorMess={formik.touched.address ? formik.errors.address : null}
    />
     <FormInput 
        placeholder="Email"
        keyboardType={"email-address"}
        isInvalid={formik.touched.email && formik.errors.email}
        value={formik.values.email}
        handleChange={formik.handleChange("email")}
        handleBlur={formik.handleBlur("email")}
        errorMess={formik.touched.email ? formik.errors.email : null}
    />
    
    {/*  */}
    

      {/*  */}
      <HStack  alignItems="center" justifyContent="space-between">
        <Box w="48%">
          <Select   placeholder="Lương"size={"lg"}p={3} _selectedItem={{ bg: "gray.200", endIcon: <Icon color="black" name="check"  size={15} />}} 
          selectedValue={formik.values.salary_type}
          onValueChange={formik.handleChange("salary_type")}
          >
              <Select.Item label="Lương cố định" value="fix" />
              <Select.Item label="Lương theo ca" value="per-shift" />
          </Select>
      </Box>
      <Box w="48%">
          <ThousandInput  
            placeholder="Mức lương" 
            isInvalid={formik.touched.salary && formik.errors.salary}
            value={formik.values.salary} 
            handleChange={formik.handleChange("salary")}  
            handleBlur={formik.handleBlur("salary")} 
            errorMess={formik.touched.salary ? formik.errors.salary : null}
          />
      </Box>
    </HStack>
     
     <MultipleSelect 
     label="Chức năng"
     name="permissions"
     isInvalid={formik.touched.permissions && formik.errors.permissions}
     value={formik.values.permissions}
      formik={formik}
     errorMess={formik.touched.permissions ? formik.errors.permissions : null}
     options={permissionChoices}
     />

    <MultipleSelect 
     label="Chi nhánh"
     name="branches"
     isInvalid={formik.touched.branches && formik.errors.branches}
     value={formik.values.branches}
      formik={formik}
     errorMess={formik.touched.branches ? formik.errors.branches : null}
     options={branches}
     />



    <Divider mt={20}/>
    </VStack>
    </ScrollView>

    <Button
        size="lg"
        // onPress={handleAddSupplier}
        // onPress={async () => { 
        // try {
        //     // var bodyFormData = new FormData();
        //     // bodyFormData.append("name", supplierFormik.values.name?.toString());
        //     // bodyFormData.append("email", supplierFormik.values.email?.toString());
        //     // bodyFormData.append("phone", supplierFormik.values.phone?.toString());
        //     // bodyFormData.append("payment_info", supplierFormik.values.paymentInfo?.toString());
        //     // bodyFormData.append("payment_info", supplierFormik.values.company?.toString());
        //     // bodyFormData.append("address", supplierFormik.values.address?.toString());
        //     // bodyFormData.append("image", image);

        //     let bodyFormData = {
        //         name: supplierFormik.values.name?.toString(),
        //         email: supplierFormik.values.email?.toString(),
        //         phone: supplierFormik.values.phone?.toString(),
        //         address:supplierFormik.values.address?.toString(),
        //         payment_info:supplierFormik.values.paymentInfo?.toString(),
        //         company:supplierFormik.values.company?.toString(),
        //     };
        //     if(!isEdit ){
        //         console.log("store_uuid",store_uuid )
        //         console.log("bodyFormData",bodyFormData )
        //         await supplierApi.createSupplier(
        //             store_uuid,
        //             bodyFormData
        //           );
        //           console.log("hello2")
        //         navigation.goBack()
        //         //   dispatch(statusAction.successfulStatus("Tạo nhà cung cấp thành công"));
        //     }else{
        //         await supplierApi.updateSupplier(store_uuid, row.uuid, bodyFormData)
        //         navigation.navigate('SupplierDetailScreen', {dataEdit:{...bodyFormData, uuid:row.uuid}})
        //     } 
        //     // props.onReload();
        //   } catch (err) {
        //     // dispatch(statusAction.failedStatus("Tạo nhà cung cấp thất bại"));
        //     console.log(err);
        //   }

        // }}
        style={{position: 'absolute', left: 15, right: 15, bottom: 15}}
        // isDisabled = {!(supplierFormik.isValid && Object.keys(supplierFormik.touched).length > 0)}
    >

       { !isEdit? "THÊM NHÂN VIÊN":"LƯU THAY ĐỔI" }
    </Button>
 

    </>


  )
}

export default AddEmployee


let permissionChoices = [
  { id: 1,  name: "Kho hàng" },
  { id: 2,  name: "Nhân sự" },
  { id: 3,name: "Bán hàng" },
  { id: 4,  name: "Sản phẩm" },
  { id: 5,  name: "Báo cáo" },
];