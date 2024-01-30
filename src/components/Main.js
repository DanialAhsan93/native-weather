import {
    StyleSheet, Text, View, TouchableOpacity, ImageBackground,
    TextInput, Image, ScrollView, ActivityIndicator, FlatList
} from 'react-native'
import React from 'react';
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';


const openUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "cf104000b8ae2b37ab8d151d7b241140";



const Main = ({ onPress, handleSearchTextChange, isWeatherData, handleSearch }) => {

    const [searchText, setsearchText] = useState('')
    const [error, setError] = useState(null);

    // const getdata = async (city) => {
    //     try {
    //         const response = await axios.get(`${openUrl}forecast?q=${city}&appid=${apiKey}`);
    //         const weatherData = response.data
    //         console.log(weatherData)
    //         return weatherData

    //     } catch (error) {
    //         console.log("...weather-data not receiced", error)
    //         setError(error.message);
    //         return null;
    //     }
    // }

    // useEffect(() => {
    //     getdata("london").then((data) => {
    //         setisWeatherData(data);
    //     });

    // }, [])
    // const handleSearch = async () => {
    //     try {
    //         const data = await getdata(searchText)
    //         // console.log(data)
    //         setisWeatherData(data)

    //     } catch (error) {
    //         console.log("...weather-data not receiced", error)
    //     }
    // }


    return (

        <ImageBackground
            source={require('../../assets/images/bcksce.jpg')}
            resizeMode="cover"
            style={styles.backgroundImage}
        >
            <ScrollView contentContainerStyle={styles.extraContainer}>
                <View style={styles.mainContainer}>

                    <View style={{ marginTop: 40 }}>
                        <Image
                            source={require('../../assets/images/cloudlogo.png')}
                            resizeMode="cover"
                            style={{ width: 150, height: 90 }}
                        />
                    </View>

                    <View style={[styles.mainContainer, { height: 'auto' }]}>
                        {isWeatherData ? (
                            <>
                                <View style={[styles.mainContainer, { height: 'auto' }]}>
                                    <Text style={styles.cityStyle}>
                                        {isWeatherData?.city?.name.length < 10 ?
                                            isWeatherData?.city?.name :
                                            ` ${(isWeatherData?.city?.name).slice(0, 10)}...`
                                        }
                                    </Text>

                                </View>
                                <Text style={{ color: '#fff', fontSize: 39 }}>
                                    {((isWeatherData?.list[0]?.main?.temp) - 273.15).toFixed(2)}°
                                </Text>
                                <Text style={{ color: '#fff' }}>
                                    {isWeatherData?.list[0]?.weather[0]?.description}
                                </Text>
                                <View style={{
                                    width: '45%',
                                    // borderWidth: 1,
                                    // borderColor: '#fff',
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    marginTop: 7,
                                }} >
                                    <Text style={{ color: '#fff', marginRight: 4, }}>
                                        H : {isWeatherData?.list[0]?.main?.humidity}
                                    </Text>
                                    <Text style={{ color: '#fff', marginLeft: 4 }}>
                                        W/S : {(isWeatherData?.list[0]?.wind?.speed).toFixed(1)}
                                    </Text>

                                </View>


                            </>)
                            : (
                                <>
                                    <View style={[styles.mainContainer, { height: 'auto', marginTop: 112 }]}>
                                        <ActivityIndicator size="large" />
                                        {/* <Text style={[styles.cityStyle, { fontSize: 30, marginTop: 80 }]}>
                        No data available
                    </Text> */}

                                    </View>
                                </>
                            )

                        }
                    </View>
                    <View style={styles.searchContainer}>
                        <View style={{ width: '70%', paddingBottom: 5, }}>
                            <TextInput
                                value={searchText}
                                // onChangeText={setsearchText}
                                onChangeText={(text) => {
                                    setsearchText(text);
                                    handleSearchTextChange(text); // Update the search text in Home.js
                                }}
                                style={styles.searchInput}
                                placeholder="Search"
                                placeholderTextColor={"#a0a0a0"}
                            />

                        </View>
                        <View style={{ width: '10%', paddingBottom: 0 }}>
                            <TouchableOpacity
                                // onPress={handleSearch}
                                onPress={() => handleSearch(searchText)}
                            >
                                <Image
                                    source={{ uri: 'https://img.icons8.com/fluency-systems-regular/48/sent--v1.png' }}
                                    style={styles.searchIcon}
                                />

                            </TouchableOpacity>
                        </View>
                    </View>
                    <StatusBar style="light" />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPress} />
                    <View
                        style={{
                            width: '100%',
                            height: 60
                        }}
                    ></View>
                    <View style={{
                        width: '100%',
                    }}>
                        <Nav />
                    </View>

                </View>

            </ScrollView>


        </ImageBackground>







    )
}

export default Main

const styles = StyleSheet.create({

    extraContainer: {
        flex: 1,
    },
    mainContainer: {
        width: '100%',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    button: {
        height: 60,
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 25,
        opacity: 0.6,
        // marginTop: 25

    },
    backgroundImage: {
        width: "100%",
        height: "100%",
    },
    cityStyle: {
        color: '#fff',
        fontSize: 36,
        letterSpacing: 2,
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 30,
    },
    searchInput: {
        color: '#a0a0a0',
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        width: '100%',
        fontSize: 20,
    },
    searchIcon: {
        width: 20,
        height: 20,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: '#a0a0a0',
        marginTop: 8,
    },
    imgStyle: {
        marginTop: 4,
        borderWidth: 1,
        borderColor: 'white'
    }


})