import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, Modal, Button, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import supabase from '../configs/supabase';

function AppointmentDateSelection({ route, navigation }) {
  const selectedUserType = route.params.selectedUserType;
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [departmentNames, setDepartmentNames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);

  useEffect(() => {
    async function fetchDepartmentNames() {
      try {
        const { data, error } = await supabase.from('departments').select('department_name, department_id');
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

  const setDepartmentId = async (selectedDepartment) => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('department_id, appointment_capacity_day, appointment_capacity_hour')
        .eq('department_name', selectedDepartment);

      if (error) {
        console.error('Error fetching department ID:', error);
      } else {
        if (data.length > 0) {
          setSelectedDepartmentId(data[0].department_id);
        } else {
          setSelectedDepartmentId('');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDatePress = async (date) => {
    setSelectedDate(date);

    if (selectedDepartmentId) {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('appointment_time')
          .eq('transaction_department', selectedDepartmentId)
          .eq('appointment_date', date);

        if (error) {
          console.error('Error fetching appointment data:', error);
        } else {
          setAppointmentData(data);
          setModalVisible(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const getTimeIntervals = () => {
    const timeIntervals = [];

    for (let i = 7; i < 17; i++) {
      const startHour = `${i}:30`;
      const endHour = `${i + 1}:00`;
      timeIntervals.push({ start: startHour, end: endHour });
    }

    return timeIntervals;
  };

  const handleTimeSlotClick = (start) => {
    navigation.navigate('Appointment Form', {
      selectedUserType,
      selectedDepartmentId,
      selectedTimeSlot: start,
      selectedDate,
    });

    setModalVisible(false);
  };

  const getAppointmentCountForInterval = (start, end) => {
    return appointmentData.filter(appointment => {
      const appointmentTime = appointment.appointment_time;
      return appointmentTime >= start && appointmentTime < end;
    }).length;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Appointment Date Selection</Text>

      <Picker
        selectedValue={selectedDepartment}
        onValueChange={(itemValue) => {
          setSelectedDepartment(itemValue);
          setDepartmentId(itemValue);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select a Department" value="" />
        {departmentNames.map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker>

      <Calendar
        style={{
          height: 350,
          marginTop: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'gray',
        }}
        theme={{
          todayTextColor: '#1b9fe4',
          textSectionTitleColor: 'black',
          monthTextColor: 'gray',
          dayTextColor: 'gray',
          textMonthFontWeight: 'bold',
          textDayFontWeight: 'bold',
        }}
        onDayPress={(day) => handleDatePress(day.dateString)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Appointment Data:</Text>
            {appointmentData.map((appointment, index) => (
              <Text key={index}>{appointment.appointment_time}</Text>
            ))}
            <Text style={styles.modalHeading}>Available Time Intervals:</Text>
            {getTimeIntervals().map((interval, index) => (
              <TouchableOpacity key={index} onPress={() => handleTimeSlotClick(interval.start, interval.end)}>
                <Text>{interval.start} - {interval.end}</Text>
                <Text>{getAppointmentCountForInterval(interval.start, interval.end)}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 30,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalHeading: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AppointmentDateSelection;
