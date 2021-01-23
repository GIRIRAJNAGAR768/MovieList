import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MovieItem = ({movie}) => {
    const { Title, Year, Type, Poster } = movie
    return (
        <View style={styles.container}>
            <View style={{ height: '100%', width: '25%', borderRadius: 10 }}>
                <Image source={{ uri: Poster }} style={{ height: '100%', borderRadius: 10 }} />
            </View>
            <View style={{ flexShrink: 1, paddingHorizontal: 10 }}>
                <Text onPress={async () => await AsyncStorage.clear()}>{"Title: " + Title}</Text>
                <Text>{"Year: " + Year}</Text>
                <Text>{"Type: " + Type}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 100,
        backgroundColor: 'white',
        margin: 10,
        elevation: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingTop: 5
    }
})

export default MovieItem
