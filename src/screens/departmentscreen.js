import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardDept from '../departments/dashboard';

const Stack = createStackNavigator();

const DepartmentStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="UserScreen">
        <Stack.Screen 
        name="Dashboard" 
        component={DashboardDept} 
        options={{ headerShown: false }} 
        />
    </Stack.Navigator>
  );
};

export default DepartmentStackNavigator;
