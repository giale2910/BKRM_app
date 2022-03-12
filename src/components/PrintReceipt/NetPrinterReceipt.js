// import React ,{ useState ,useEffect}from 'react'
// import {
//     USBPrinter,
//     NetPrinter,
//     BLEPrinter,
//   } from "react-native-thermal-receipt-printer";
  
// import {StyleSheet,TouchableOpacity,View,Text} from "react-native"
// import { useTheme } from "native-base";
// const useStyle = (theme) => {return StyleSheet.create({
//     container:{
//         height:300
//     }
//   })};
// const NetPrinterReceipt = () => {
//     const theme = useTheme();
//     const styles = useStyle(theme)

    
//   const [printers, setPrinters] = useState([{host: '192.168.10.241', port: 9100}]);
//   const [currentPrinter, setCurrentPrinter] = useState();
//   console.log("currentPrinter",currentPrinter)
//       useEffect(() => {
//         NetPrinter.init().then(() => {
//             // setPrinters({printers: [{host: '192.168.10.241', port: 9100}]})
//             this.setState(Object.assign({}, this.state, {printers: [{host: '192.168.10.241', port: 9100}]}))
//             })
//         // NetPrinter.init().then(()=> {
//         //     //list printers
//         //     NetPrinter.getDeviceList().then(setPrinters);
//         //   })
//       }, []);
    
    
//      const _connectPrinter = (host, port) => {
//         //connect printer
//         NetPrinter.connectPrinter(host, port).then(
//           (printer) => setCurrentPrinter(printer),
//           error => console.warn(error))
//     }
    
//      const printTextTest = () => {
//         // if (this.state.currentPrinter) {
//         //   NetPrinter.printText("<C>sample text</C>\n");
//         // }
//         currentPrinter && NetPrinter.printText("<C>sample text</C>\n");
//       }
    
//     const  printBillTest = () => {
//         // if(this.state.currentPrinter) {
//         //   NetPrinter.printBill("<C>sample bill</C>");
//         // }
//         currentPrinter &&  NetPrinter.printBill("<C>sample bill</C>");
//       }
    
//   return (
//     <View style={styles.container}>
//         {
//         printers.map(printer => (
//             <TouchableOpacity key={printer.device_id} onPress={(printer) => _connectPrinter(printer.host, printer.port)}>
//             <Text>{`device_name: ${printer.device_name}, host: ${printer.host}, port: ${printer.port}`}</Text> 
//             </TouchableOpacity>
//             ))
//         }
//      <TouchableOpacity onPress={printTextTest}>
//       <Text>Print Text</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={printBillTest}>
//       <Text>Print Bill Text</Text>
//     </TouchableOpacity>

//     <Text>Print Bill Text</Text>
//     <Text>Print Bill Text</Text>
//     <Text>Print Bill Text</Text>
//     </View>
//   )
// }

// export default NetPrinterReceipt