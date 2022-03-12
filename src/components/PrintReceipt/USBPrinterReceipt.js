// import React ,{ useState ,useEffect}from 'react'

// import {
//     USBPrinter,
//     NetPrinter,
//     BLEPrinter,
//   } from "react-native-thermal-receipt-printer";
// import {TouchableOpacity,View,Text} from "react-native"
// USBPrinter.printText("<C>sample text</C>");
// USBPrinter.printBill("<C>sample bill</C>");

// // interface IUSBPrinter {
// //     device_name: string;
// //     vendor_id: number;
// //     product_id: number;
// //   }

// const USBPrinterReceipt = () => {
// const [printers, setPrinters] = useState([]);
//   const [currentPrinter, setCurrentPrinter] = useState();

//   useEffect = () => {
//     if(Platform.OS == 'android'){
//       USBPrinter.init().then(()=> {
//         //list printers
//         USBPrinter.getDeviceList().then(setPrinters);
//       })
//     }
//   }

//   const _connectPrinter = (printer) => USBPrinter.connectPrinter(printer.vendorID, printer.productId).then(() => setCurrentPrinter(printer))

//   const printTextTest = () => {
//     currentPrinter && USBPrinter.printText("<C>sample text</C>\n");
//   }

//   const printBillTest = () => {
//     currentPrinter && USBPrinter.printBill("<C>sample bill</C>");
//   }
//   return (
//     <View style={styles.container}>
//       {
//         printers.map(printer => (
//           <TouchableOpacity key={printer.device_id} onPress={() => _connectPrinter(printer)}>
//             {`device_name: ${printer.device_name}, device_id: ${printer.device_id}, vendor_id: ${printer.vendor_id}, product_id: ${printer.product_id}`}
//           </TouchableOpacity>
//           ))
//       }
//       <TouchableOpacity onPress={printTextTest}>
//         <Text>Print Text</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={printBillTest}>
//         <Text>Print Bill Text</Text>
//       </TouchableOpacity>
//     </View>
//     )
// }

// export default USBPrinterReceipt