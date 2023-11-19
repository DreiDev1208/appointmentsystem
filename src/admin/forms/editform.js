import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import supabase from '../../configs/supabase';

const EditForm = ({ route }) => {
    const { rowData } = route.params;
    const [updatedData, setUpdatedData] = useState({ ...rowData });
  
    // Function to update the record
    const updateRecord = async () => {
      const { department_id } = updatedData;
      try {
        if (department_id) {
          const { data, error } = await supabase
            .from('departments')
            .update({
              department_name: updatedData.department_name,
              operating_days: updatedData.operating_days,
              operating_hours: updatedData.operating_hours,
              appointment_capacity_day: updatedData.appointment_capacity_day,
              appointment_capacity_hour: updatedData.appointment_capacity_hour,
              creation_date: updatedData.creation_date,
              updated_date: updatedData.updated_date,
            })
            .eq('department_id', department_id);
          if (data) {
            console.log('Department record updated:', data);
          } else {
            console.error('Error updating department record:', error);
          }
        }
      } catch (error) {
        console.error('Error updating record:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text>Edit Form</Text>
        <TextInput
          style={styles.input}
          placeholder="Department Name"
          value={updatedData.department_name}
          onChangeText={(text) => setUpdatedData({ ...updatedData, department_name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Operating Days"
          value={updatedData.operating_days}
          onChangeText={(text) => setUpdatedData({ ...updatedData, operating_days: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Operating Hours"
          value={updatedData.operating_hours}
          onChangeText={(text) => setUpdatedData({ ...updatedData, operating_hours: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Appointment Capacity per Day"
          value={updatedData.appointment_capacity_day.toString()}
          onChangeText={(text) => setUpdatedData({ ...updatedData, appointment_capacity_day: parseInt(text) || 0 })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Appointment Capacity per Hour"
          value={updatedData.appointment_capacity_hour.toString()}
          onChangeText={(text) => setUpdatedData({ ...updatedData, appointment_capacity_hour: parseInt(text) || 0 })}
          keyboardType="numeric"
        />
        {/* Adjust placeholders, values, and onChangeText for other fields as needed */}
        <Button title="Update" onPress={updateRecord} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
    },
  });
  
  export default EditForm;
  