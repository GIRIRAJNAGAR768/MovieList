import React from 'react'

import AuthLoader from '../Screens/AuthLoader'
import SignInScreen from '../Screens/SignInScreen'
import SignupScreen from '../Screens/SignupScreen'
import HomeScreen from '../Screens/HomeScreen'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="authLoader">
        <Stack.Screen name="authLoader" component={AuthLoader} options={{ headerShown: false }} />
        <Stack.Screen name="signInScreen" component={SignInScreen} options={navigationOptions("Sign In")} />
        <Stack.Screen name="signUpScreen" component={SignupScreen} options={navigationOptions("Sign Up",true)} />
        <Stack.Screen name="homeScreen" component={HomeScreen} options={navigationOptions("Movies List")} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const navigationOptions = (title,isLeft) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: '#c53434',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: isLeft?'left':'center'
    },
  }
}

export default RootNavigation
