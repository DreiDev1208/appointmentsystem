// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Linking } from 'react-native';
import UserStackNavigator from './src/screens/userscreen';
import DepartmentStackNavigator from './src/screens/departmentscreen';
import AdminStackNavigator from './src/screens/adminscreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer
      linking={{
        prefixes: ['yourapp://'],
        config: {
          initialRouteName: 'UserStack',
          screens: {
            UserStack: 'user',
            DepartStack: 'department',
            AdminStack: 'admin'
          },
        },
      }}
      onReady={() => {
        Linking.getInitialURL().then((initialURL) => {
          if (initialURL) {
            Linking.openURL(initialURL);
          }
        });
      }}
    >
      <Stack.Navigator initialRouteName="UserStack">
        <Stack.Screen
          name="UserStack"
          component={UserStackNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DepartmentStack"
          component={DepartmentStackNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminStack"
          component={AdminStackNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
