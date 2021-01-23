import React from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import axios from 'axios'
import MovieItem from '../Components/MovieItem'

import InputField from '../Components/InputField'

const { height, width } = Dimensions.get('window')

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            actInd: true,
            moviesListData: [],
            searchValue: ''
        }
    }

    componentDidMount() {
        this.searchMovies('The trial', true)
    }

    searchMovies = async (searchMovies, isInitialSearch) => {

        this.setState({ actInd: true })

        let searchValue = searchMovies
        if (!isInitialSearch)
            this.setState({ searchValue })

        if (searchValue === "")
            searchValue = "The trial"


        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=${searchValue}&apikey=49cf748d`);
            this.setState({ moviesListData: response && response.data && response.data.Search || [], actInd: false })
        } catch (error) {
            console.error(error);
        }

    }

    render() {
        return (
            <>
                <StatusBar backgroundColor={'#c53434'} barStyle={'light-content'} />
                <View style={{ width: width, alignItems: 'center', marginVertical: -10 }}>
                    <InputField placeholderText={"Search movies here"} value={this.state.searchValue} onChangeValue={(value) => { this.searchMovies(value) }} />
                </View>
                {
                    this.state.actInd
                        ?
                        <View style={styles.container}>
                            <ActivityIndicator size="large" color="#000" />
                            <Text style={{ marginTop: 15 }}>Searching please wait...</Text>
                        </View>
                        :
                        <FlatList
                            keyExtractor={(item, index) => index}
                            data={this.state.moviesListData}
                            renderItem={({ item, index }) =>
                                <MovieItem movie={item} />
                            }
                        />
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
})

export default HomeScreen
