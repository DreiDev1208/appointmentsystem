import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserSelection from '../users/userselection';
import AppointmentDateSelection from '../users/appointmentdateselection';
import AppointmentForm from '../users/appointmentform';

const Stack = createStackNavigator();

function UserStackNavigator() {
    return (
      <Stack.Navigator initialRouteName="UserScreen">
        <Stack.Screen 
        name="User Selection" 
        component={UserSelection} 
        options={{ headerShown: false }} 
        />
        <Stack.Screen 
        name="Appointment Date Selection" 
        component={AppointmentDateSelection} 
        options={{ headerShown: false }} 
        />
        <Stack.Screen 
        name="Appointment Form" 
        component={AppointmentForm} 
        options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    );
  }
  
  export default UserStackNavigator;
  