import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height, width } = Dimensions.get('window');

const AuthLoader = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [actInd, setActInd] = useState(true)
  const [readStorageError, setReadStorageError] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('@isSignedIn')
      console.log(isLoggedIn);
      if (isLoggedIn !== null)
        setIsLoggedIn(true)

      setActInd(false)
    } catch (e) {
      setReadStorageError(true)
      setActInd(false)
    }
  }


  return (
    <View style={styles.container}>
      {
        actInd
          ?
          <ActivityIndicator size="large" color="#000" />
          :
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: isLoggedIn ? 'homeScreen' : 'signInScreen' },
              ],
            })
          )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: height
  }

});

export default AuthLoader;
