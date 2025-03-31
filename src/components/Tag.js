import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const Tag = ({ text, backgroundColor, textColor }) => {
  return (
    <View style={[
      styles.tagContainer,
      { backgroundColor: backgroundColor || colors.lightGray }
    ]}>
      <Text style={[
        styles.tagText,
        { color: textColor || colors.darkGray }
      ]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
    alignSelf: 'flex-start'
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500'
  }
});

export default Tag;