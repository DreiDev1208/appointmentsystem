// src/departments/components/sidebar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Sidebar = () => {
  return (
    <View style={styles.sidebar}>
      <Text>Sidebar Content Goes Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 100,
    backgroundColor: 'lightgray',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Sidebar;
