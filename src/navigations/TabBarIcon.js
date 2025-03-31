// navigation/TabBarIcon.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../constants/colors';

const TabBarIcon = ({ name, focused }) => {
  return (
    <View style={styles.container}>
      <Icon 
        name={name} 
        size={24} 
        color={focused ? colors.primary : colors.gray} 
      />
      {focused && <View style={styles.indicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  indicator: {
    position: 'absolute',
    bottom: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
});

export default TabBarIcon;