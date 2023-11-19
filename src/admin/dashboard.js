import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminSidebar from './components/sidebar';

const AdminDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AdminSidebar navigation={navigation} /> 
      <View style={styles.mainContent}>
        <Text style={styles.heading}>SuperAdmin Dashboard</Text>
        <Text>Welcome, SuperAdmin!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default AdminDashboard;
