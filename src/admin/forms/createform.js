import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import supabase from '../../configs/supabase';

const CreateForm = ({ navigation }) => {
  const [data, setData] = useState({
    department_name: '',
    operating_days: '',
    operating_hours: '',
    appointment_capacity_day: 0,
    appointment_capacity_hour: 0,
    creation_date: '',
  });

  const handleSubmit = async () => {
    try {
      const { data: newDepartment, error } = await supabase
        .from('departments')
        .insert([
          {
            department_name: data.department_name,
            operating_days: data.operating_days,
            operating_hours: data.operating_hours,
            appointment_capacity_day: data.appointment_capacity_day,
            appointment_capacity_hour: data.appointment_capacity_hour,
            creation_date: new Date().toISOString().split('T')[0],
          },
        ]);

      if (error) {
        console.error('Error inserting data into the departmentaccount table:', error);
      } else {
        console.log('Inserted Data into Department:', newDepartment);
        navigation.navigate('Account Form', { DepartmentName: data.department_name});
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Department</Text>

      <TextInput
        style={styles.input}
        placeholder="Department Name"
        onChangeText={(text) => setData({ ...data, department_name: text })}
        value={data.department_name}
      />

      <TextInput
        style={styles.input}
        placeholder="Operating Days"
        onChangeText={(text) => setData({ ...data, operating_days: text })}
        value={data.operating_days}
      />

      <TextInput
        style={styles.input}
        placeholder="Operating Hours"
        onChangeText={(text) => setData({ ...data, operating_hours: text })}
        value={data.operating_hours}
      />

      <TextInput
        style={styles.input}
        placeholder="Appointment Capacity per Day"
        onChangeText={(text) => setData({ ...data, appointment_capacity_day: parseInt(text) || 0 })}
        value={data.appointment_capacity_day.toString()}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Appointment Capacity per Hour"
        onChangeText={(text) => setData({ ...data, appointment_capacity_hour: parseInt(text) || 0 })}
        value={data.appointment_capacity_hour.toString()}
        keyboardType="numeric"
      />

      <Button title="Create" onPress={handleSubmit} />

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

export default CreateForm;
