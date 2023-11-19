import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdminSidebar = ({ navigation }) => {
  const goToDashboard = () => {
    navigation.navigate('Admin Dashboard')
  };

  const goToAccountManagement = () => {
    navigation.navigate('Account Management')
  };

  const handleLogout = () => {
    navigation.navigate('Admin Login')
  };

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={goToDashboard}>
        <Text>Dashboard </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToAccountManagement}>
        <Text>Account Management </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    height: '100vh',
    width: 200, 
    backgroundColor: '#d2f5f9',
    padding: 16,
  },
});

export default AdminSidebar;
