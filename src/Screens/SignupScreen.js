import React, { useState } from 'react'
import { View, Text, StyleSheet, StatusBar,ScrollView } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import Button from '../Components/Button'
import InputField from '../Components/InputField'
import validateEmailAddress from '../Components/validateEmailAddress'
import validateUserName from '../Components/validateUserName'
import showToast from '../Components/showToast'
import AsyncStorage from '@react-native-async-storage/async-storage'


const SignUpScreen = (props) => {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onPressSignUp = () => {

        if (userName === "" || email === "" || password === "" || confirmPassword === "")
            showToast("Please enter all fields")
        else {
            if (validateUserName(userName)) {
                if (validateEmailAddress(email)) {
                    if (password === confirmPassword)
                        SignUpProceed()
                    else
                        showToast("password and confirmPassword must be the same.")
                }
                else
                    showToast("Enter a valid email address.")
            }
            else
                showToast("Username must not contains any spacial character.")
        }
    }

    const SignUpProceed = async () => {

        const userData = {
            userName: userName,
            email: email,
            password: password
        }
        await AsyncStorage.setItem("@userData", JSON.stringify(userData))
        showToast("You are registered successfully. Sign in now.")
        onPressSignIn()

    }

    const onPressSignIn = () => {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'signInScreen' },
                ],
            })
        )
    }
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <StatusBar backgroundColor={'#c53434'} barStyle={'light-content'} />
            <Text style={styles.signInTitle}>SIGN UP</Text>

            <View style={styles.inputContainer}>
                <InputField placeholderText={"Username"} value={userName} onChangeValue={(value) => { setUserName(value) }} />
                <InputField placeholderText={"Email"} value={email} onChangeValue={(value) => { setEmail(value) }} />
                <InputField placeholderText={"Password"} value={password} onChangeValue={(value) => { setPassword(value) }} />
                <InputField placeholderText={"Confirm Password"} value={confirmPassword} onChangeValue={(value) => { setConfirmPassword(value) }} />
            </View>
            

            <Button title={"Sign Up"} onButtonPress={() => {
                onPressSignUp()
            }} />
            <View style={styles.signUpContainer}>
                <Text>Already have one?</Text>
                <Text onPress={() => {
                    onPressSignIn()
                }} style={styles.signUpText}>Sign in here</Text>
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

export default SignUpScreen
