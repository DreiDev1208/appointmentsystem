import React, { useState, useEffect } from 'react';
import { View, Text, Picker, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import supabase from '../configs/supabase';

function UserSelection() {
  const [userTypes, setUserTypes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchUserTypes() {
      try {
        const { data, error } = await supabase.from('user_type').select('user_type_name');
        if (error) {
          console.error('Error fetching user types:', error);
        } else {
          const userTypes = data.map((item) => item.user_type_name);
          setUserTypes(userTypes);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchUserTypes();
  }, []);

  const handleConfirm = () => {
    navigation.navigate('Appointment Date Selection', { selectedUserType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Make an Appointment as:</Text>
      <Picker
        selectedValue={selectedUserType}
        onValueChange={(itemValue) => setSelectedUserType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a User Type" value="" />
        {userTypes.map((type, index) => (
          <Picker.Item key={index} label={type} value={type} />
        ))}
      </Picker>
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  picker: {
    marginBottom: 15,
  }
});

export default UserSelection;
