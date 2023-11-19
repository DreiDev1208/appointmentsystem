import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminLogin from '../admin/login';
import DashboardAdmin from '../admin/dashboard';
import AccountManagement from '../admin/components/accountmanagement';
import CreateForm from '../admin/forms/createform';
import EditForm from '../admin/forms/editform';
import AccountForm from '../admin/forms/accountform';

const Stack = createStackNavigator();

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard Admin">
        <Stack.Screen 
        name="Admin Login" 
        component={AdminLogin} 
        options={{ headerShown: false }} 
        />
        <Stack.Screen 
        name="Dashboard Admin" 
        component={DashboardAdmin} 
        options={{ headerShown: false }} 
        />
        <Stack.Screen 
        name="Account Management" 
        component={AccountManagement} 
        options={{ headerShown: false }} 
        />
        <Stack.Screen 
        name="Create Form" 
        component={CreateForm} 
        options={{ headerShown: false }} 
        />
        <Stack.Screen 
        name="Edit Form" 
        component={EditForm} 
        options
        ={{ headerShown: false }} 
        />
        <Stack.Screen 
        name="Account Form" 
        component={AccountForm} 
        options
        ={{ headerShown: false }} 
        />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;
