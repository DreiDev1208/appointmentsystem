import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';
import supabase from '../configs/supabase';

function AppointmentForm({ route, navigation }) {
  const { selectedUserType, selectedDepartmentId, selectedTimeSlot, selectedDate } = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactInformation, setContactInformation] = useState('');
  const [purpose, setPurpose] = useState('');
  const [userDepartment, setUserDepartment] = useState('');

  const [departmentNames, setDepartmentNames] = useState([]);

  useEffect(() => {
    async function fetchDepartmentNames() {
      try {
        const { data, error } = await supabase.from('departments').select('department_name');
        if (error) {
          console.error('Error fetching department names:', error);
        } else {
          const names = data.map((item) => item.department_name);
          setDepartmentNames(names);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchDepartmentNames();
  }, []);

  const handleMakeAppointment = async () => {
    try {
      const { data, error } = await supabase.from('appointments').upsert([
        {
          first_name: firstName,
          last_name: lastName,
          user_type: selectedUserType,
          contact_information: contactInformation,
          user_department: userDepartment,
          transaction_department: selectedDepartmentId,
          appointment_date: selectedDate,
          appointment_time: selectedTimeSlot,
          purpose: purpose,
          appointment_status: 'Pending',
        },
      ]);

      if (error) {
        console.error('Error making an appointment:', error);
      } else {
        navigation.navigate('User Selection');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Appointment Form</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Information"
        value={contactInformation}
        onChangeText={setContactInformation}
      />
      <Picker
        selectedValue={userDepartment}
        onValueChange={(itemValue) => setUserDepartment(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Your Department" value="" />
        {departmentNames.map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Purpose"
        value={purpose}
        onChangeText={setPurpose}
      />
      <Button title="Make an Appointment" onPress={handleMakeAppointment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AppointmentForm;
