// src/departments/components/dashboard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Sidebar from './components/sidebar';

const DashboardDept = () => {
  return (
    <View style={styles.container}>
      <Sidebar />
      <View style={styles.contentContainer}>
        <Text>Department Dashboard Content Goes Here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardDept;
