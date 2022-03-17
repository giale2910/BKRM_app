import React from 'react'
import {Linking,Platform,TouchableOpacity,Text} from "react-native";

export const callPhone = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
}

export const formatDate = (fullDate) => {
    if(fullDate ===undefined){return }
    fullDate = fullDate.split(' ')
    var date = fullDate[0].split('-').reverse()
    var year = date[2].substring(2,5)
    var time = fullDate[1].substring(0, 5)

    return date[0] + "/" +  date[1] + "/" + year  +  " " +time

}

export function calculateTotalQuantity ( cartList ) {
    if(cartList ===undefined){return }
    var value= 0
    cartList.map(item => value +=item.quantity )
    return value.toLocaleString()
  }
export function calculateTotalReturnQuantity ( cartList ) {
    if(cartList ===undefined){return }
    var value= 0
    cartList.map(item => value +=item.returnQuantity )
    return value.toLocaleString()
}

  


