import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, FlatList } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import supabase from '../../configs/supabase';
import AdminSidebar from './sidebar';

const AccountManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditDeleteModalVisible, setEditDeleteModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchDepartments() {
      const { data, error } = await supabase
        .from('department_accounts')
        .select(`*,departments!inner(department_name)`);
      if (data) {
        setDepartments(data);
      } else {
        console.error('Error fetching departments:', error);
      }
    }

    fetchDepartments();
  }, []);

  const openCreateModal = () => {
    setCreateModalVisible(true);
  };

  const handleCreate = () => {
    navigation.navigate('Create Form');
    closeCreateModal();
  };

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setEditDeleteModalVisible(true);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  const closeEditDeleteModal = () => {
    setEditDeleteModalVisible(false);
  };

  const handleEdit = () => {
    navigation.navigate('Edit Form', { rowData: selectedRowData });
    closeEditDeleteModal();
  };

  const handleDelete = () => {
    console.log('Delete Clicked');
    closeEditDeleteModal();
  };

  return (
    <View style={styles.container}>
      <AdminSidebar navigation={navigation} />
      <View style={styles.mainContent}>
        <Text style={styles.heading}>Super Admin Account Management</Text>
        <Button title="Create" onPress={openCreateModal} />

        <FlatList
          data={departments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRowClick(item)}>
              <View style={styles.row}>
                <Text style={styles.cellText}>{item.accountid}</Text>
                <Text style={styles.cellText}>{item.departmentid}</Text>
                <Text style={styles.cellText}>{item.department.department_name}</Text>
                <Text style={styles.cellText}>{item.username}</Text>
                <Text style={styles.cellText}>{item.password}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal for Create */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCreateModalVisible}
        onRequestClose={closeCreateModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleCreate}>
              <Text>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeCreateModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Edit and Delete */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditDeleteModalVisible}
        onRequestClose={closeEditDeleteModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Selected Row Data: {JSON.stringify(selectedRowData)}</Text>
            <TouchableOpacity onPress={handleEdit}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeEditDeleteModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default AccountManagement;
