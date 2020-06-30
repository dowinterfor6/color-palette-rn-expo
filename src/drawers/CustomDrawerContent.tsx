import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// import * as Linking from 'expo-linking'; // alternative

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Google"
        onPress={() => Linking.openURL('https://www.google.com')}
        icon={() => <AntDesign name="google" size={24} color="black" />}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
