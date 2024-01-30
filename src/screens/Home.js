import {
    ScrollView, Dimensions, StyleSheet, Text, View,
    TextInput, TouchableOpacity, Animated, ImageBackground, FlatList, Image
} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '../components/BottomSheet';
import { useCallback, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Main from '../components/Main';
import Forecast from '../components/Forecast';
import { useState, useEffect } from "react";
import axios from 'axios';
import Nav from '../components/Nav';


const openUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "cf104000b8ae2b37ab8d151d7b241140";

const Home = () => {
    const [isWeatherData, setisWeatherData] = useState(null);
    const [searchText, setsearchText] = useState('');

    const getdata = async (city) => {
        try {
            const response = await axios.get(`${openUrl}forecast?q=${city}&appid=${apiKey}`);
            const weatherData = response.data
            // console.log(weatherData)
            return weatherData

        } catch (error) {
            console.log("...weather-data not receiced", error)
        }
    }

    useEffect(() => {
        getdata("london").then((data) => {
            setisWeatherData(data);
        });

    }, [])

    // const handleSearch = async () => {
    //     try {
    //         const data = await getdata(searchText)
    //         // console.log(data)
    //         setisWeatherData(data)

    //     } catch (error) {
    //         console.log("...weather-data not receiced", error)
    //     }
    // }
    const handleSearch = async () => {
        try {
            const data = await getdata(searchText);
            setsearchText('');
            setisWeatherData(data)
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    const handleSearchTextChange = (text) => {
        setsearchText(text);
    };


    const ref = useRef(null);
    const onPress = useCallback(() => {
        const isActive = ref?.current?.isActive?.();
        if (isActive) {
            ref?.current.scrollto(0)
        } else {
            ref?.current.scrollto(-200)
        }
    }, [])


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <View style={styles.container}>
                <Main onPress={onPress}
                    isWeatherData={isWeatherData}
                    handleSearchTextChange={handleSearchTextChange}
                    handleSearch={handleSearch} />

                

                <BottomSheet ref={ref}>
                    <ImageBackground
                        source={require('../../assets/images/abstractsec.jpg')}
                        resizeMode="cover"
                        style={styles.backgroundImage}
                        blurRadius={3}
                    />
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.4)']}
                        style={[styles.gradientLayer, { borderRadius: 23 }]}
                    />

                    <View style={styles.contentContainer}>

                        <Forecast isWeatherData={isWeatherData} />


                    </View>
                </BottomSheet>


            </View>
        </GestureHandlerRootView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
        position:'relative'
    },
    // button: {
    //     height: 60,
    //     aspectRatio: 1,
    //     backgroundColor: 'white',
    //     borderRadius: 25,
    //     opacity: 0.6,

    // },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    gradientLayer: {
        ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: 'center'
    },

})