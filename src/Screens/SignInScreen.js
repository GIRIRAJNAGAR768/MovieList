import React, { useState } from 'react'
import { View, Text, StyleSheet, StatusBar,ScrollView} from 'react-native'
import { CommonActions } from '@react-navigation/native'
import Button from '../Components/Button'
import InputField from '../Components/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage'
import showToast from '../Components/showToast'
import validateUserName from '../Components/validateUserName'

const SignInScreen = (props) => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const onPressSignIn = () => {

        if (userName === "" || password === "")
            showToast("Please enter all fields")
        else {
            if (validateUserName(userName)) {
                if (password !== "")
                    SignInProceed();
                else
                    showToast("Password field can not be empty")
            }
            else
                showToast("Username must not contains any spacial character")
        }
    }

    const SignInProceed = async () => {
        const userDataString = await AsyncStorage.getItem('@userData')
        if (userDataString != null) {
            const userData = JSON.parse(userDataString)
            if (userData.userName === userName) {
                if (userData.password === password) {
                    showToast("Sign in successfully")
                    await AsyncStorage.setItem("@isSignedIn", "true")
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: 'homeScreen' },
                            ],
                        })
                    )
                }
                else
                    showToast("Invalid password")
            }
            else
                showToast("Invalid username")
        }
        else
            showToast("user not registered yet. Signup before proceeding.")
    }

    const onPressSignUp = () => {
        props.navigation.navigate('signUpScreen')
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <StatusBar backgroundColor={'#c53434'} barStyle={'light-content'} />

            <Text style={styles.signInTitle}>SIGN IN</Text>

            <View style={styles.inputContainer}>
                <InputField placeholderText={"Username"} value={userName} onChangeValue={(value) => { setUserName(value) }} />
                <InputField placeholderText={"Password"} value={password} onChangeValue={(value) => { setPassword(value) }} />
            </View>

            <Button title={"Sign In"} onButtonPress={() => {
                onPressSignIn()
            }} />
            <View style={styles.signUpContainer}>
                <Text>Don't have one?</Text>
                <Text onPress={() => {
                    onPressSignUp()
                }} style={styles.signUpText}>Sign up here</Text>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer:{ 
        flexGrow: 1, 
        justifyContent: 'center',
        backgroundColor:'white',
        paddingVertical:20 
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    signInTitle: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '90%',
        marginVertical: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 50,
        elevation: 1,
        paddingVertical: 20,
        borderRadius: 2
    },

    buttonContainer: {
        flexDirection: "row",
        width: '90%',
        justifyContent: 'space-evenly'
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    signUpText: {
        marginLeft: 10,
        color: 'green',
        textDecorationLine: 'underline'
    }

})

export default SignInScreen
