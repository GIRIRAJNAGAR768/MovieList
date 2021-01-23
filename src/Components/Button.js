import React from 'react'
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet, Dimensions } from 'react-native'

const TouchableElement = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback
const { height, width } = Dimensions.get('window')

const Button = ({title, onButtonPress}) => {

   

    return (
        <TouchableElement onPress={() => onButtonPress()}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableElement>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: width * 0.5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c53434',
        borderRadius: 8
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default Button
