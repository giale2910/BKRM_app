import React ,{ useState ,useEffect}from 'react'
import {
    USBPrinter,
    NetPrinter,
    BLEPrinter,
  } from "react-native-thermal-receipt-printer";
  
import {StyleSheet,TouchableOpacity,View,Text} from "react-native"
import { useTheme } from "native-base";

const useStyle = (theme) => {return StyleSheet.create({
    container:{
        height:300
    }
  })};
const BLEPrinterReceipt = () => {

  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState();

  const theme = useTheme();
  const styles = useStyle(theme)

  useEffect(() => {
    BLEPrinter.init().then(()=> {
      BLEPrinter.getDeviceList().then(setPrinters);
    });
  }, []);

  const _connectPrinter = (printer) => {
    //connect printer
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      setCurrentPrinter,
      error => console.warn(error))
  }

  const printTextTest = () => {
    currentPrinter && BLEPrinter.printText("<C>sample text</C>\n");
  }

  const printBillTest = () => {
    currentPrinter && BLEPrinter.printBill(
     "<Text>Xin chào các bạn</Text>" 
    );
  }


  return (
    <View style={styles.container}>
    {
      printers.map(printer => (
        <TouchableOpacity key={printer.inner_mac_address} onPress={() => _connectPrinter(printer)}>
           <Text>{`device_name: ${printer.device_name}, inner_mac_address: ${printer.inner_mac_address}`}</Text>
        </TouchableOpacity>
        ))
    }
    <TouchableOpacity onPress={printTextTest}>
      <Text>Print Text</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={printBillTest}>
      <Text>Print Bill Text</Text>
    </TouchableOpacity>
  </View>
  )
}

export default BLEPrinterReceipt