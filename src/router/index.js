// import {createStackNavigator} from "@react-navigation/stack"÷
import * as React from 'react';
import DashScreen from "../screens/DashScreen"
import WelcomeScreen from "../screens/WelcomeScreen"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Dash" component={DashScreen}  options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator