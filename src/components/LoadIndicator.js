import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingIndicator = () => (
  <View style={{ padding: 20 }}>
    <ActivityIndicator size="large" />
  </View>
);

export default LoadingIndicator;