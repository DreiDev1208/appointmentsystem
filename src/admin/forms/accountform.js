import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import supabase from '../../configs/supabase';

const AccountForm = ({ route, navigation }) => {
  const { DepartmentName } = route.params;
  const [id, setId] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    async function fetchId() {
      try {
        const { data, error } = await supabase
          .from('departments')
          .select('department_id')
          .eq('department_name', DepartmentName)
          .single();

        if (data) {
          setId(data.department_id);
        } else {
          console.error('Error fetching departmentid:', error);
        }
      } catch (error) {
        console.error('Error in fetchId:', error);
      }
    }

    fetchId();
  }, [DepartmentName]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  
  const insertData = async () => {
    const username = formData.username;
    const password = formData.password;

    try {
      // Insert data into the 'departmentaccount' table
      const { data, error } = await supabase.from('department_accounts').insert([
        {
          department_id: id,
          username,
          password,
          creation_date: new Date().toISOString().split('T')[0], 
        },
      ]);

      if (error) {
        console.error('Error inserting data into departmentaccount:', error);
      } else {
        console.log('Inserted Data into Department Account:', data);
        navigation.navigate('Dashboard Admin');
      }
    } catch (error) {
      console.error('Error in insertData:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Department Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => handleChange('username', text)}
        value={formData.username}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => handleChange('password', text)}
        value={formData.password}
        secureTextEntry={true} 
      />

      <Button title="Insert Data" onPress={insertData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default AccountForm;
