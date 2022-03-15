import React from 'react'
import {Linking,Platform,TouchableOpacity,Text} from "react-native";

export const callPhone = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
}

