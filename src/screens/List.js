import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const openUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "cf104000b8ae2b37ab8d151d7b241140";

const List = () => {

    const [isWeatherData, setisWeatherData] = useState([]);
    const [loading, setloading] = useState(true)
    const getdata = async (cities) => {
        try {
            const promises = cities.map(async (city) => {
                const response = await axios.get(`${openUrl}forecast?q=${city}&appid=${apiKey}`);
                return response.data

            })
            const weatherData = await Promise.all(promises)
            // console.log(weatherData)
            return weatherData

        } catch (error) {
            console.log("...weather-data not receiced", error)
        }
    }

    // useEffect(() => {
    //     const cities = ["london", "Islamabad", "Paris", "Sydney", "Beijing"]
    //     getdata(cities).then((data) => {
    //         setisWeatherData(data);
    //     });
    //     setTimeout(() => {
    //         const cities2 = ["New York", "Tokyo", "Berlin", "Cairo", "Mumbai"];
    //         getdata(cities2).then((data2) => {
    //             setisWeatherData(data2);
    //         });
    //     }, 2000);

    // }, [])

    useEffect(() => {
        const allCities = [
            ["london", "Islamabad", "Paris", "Sydney", "Beijing"],
            ["New York", "Tokyo", "Berlin", "Cairo", "Mumbai"],
            ["Los Angeles", "Moscow", "Rome", "Seoul", "Toronto"],
        ];
        let currentIndex = 0;
        const fetchData = () => {
            const currentCities = allCities[currentIndex];
            getdata(currentCities).then((data) => {
                setisWeatherData(data);
                setloading(false)
            });
            currentIndex = (currentIndex + 1) % allCities.length;
        };
        fetchData();
        const intervalId = setInterval(fetchData, 4000);
        return () => clearInterval(intervalId);
    }, []);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const currentDay = new Date().getDay()
    const updatedDay = daysOfWeek[currentDay];
    // console.log(updatedDay)

    return (
        <ScrollView style={{ backgroundColor: '#382f51' }}>
            {loading ? (

                <View style={{ flex: 1, justifyContent: 'center', height: 600 }}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            ) : (
                <View style={styles.mainContainer}>

                    <View style={styles.subContainer}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}>

                            {isWeatherData.map((item, index) => {
                                return (

                                    <View key={index} View style={styles.cardContainer} >
                                        <LinearGradient
                                            colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.1)']}
                                            style={styles.gradientLayer}
                                        >
                                            <Text style={styles.dayStyle}>
                                                {updatedDay}
                                            </Text>
                                            <Text style={styles.cityBox}>
                                                {
                                                    item?.city?.name.length > 10 ?
                                                        `${(item?.city?.name).slice(0, 10)}...` :
                                                        `${item?.city.name}`
                                                }

                                            </Text>

                                            <View style={styles.innerBox}>
                                                <View style={{
                                                    width: '50%',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-start'
                                                }}
                                                >
                                                    <Image
                                                        source={require('../../assets/images/tempicon.png')}
                                                        resizeMode="cover"
                                                        style={styles.iconStyle}
                                                    />
                                                    <Text style={styles.innerTxtStyle}>
                                                        Temp : {item?.list[0]?.wind?.speed}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    width: '50%',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    paddingRight: 10,
                                                }}>

                                                    <Image
                                                        source={require('../../assets/images/windicon.png')}
                                                        resizeMode="cover"
                                                        style={styles.iconStyle}
                                                    />
                                                    <Text style={styles.innerTxtStyle}>
                                                        WindSpeed :
                                                    </Text>
                                                    <Text style={[styles.innerTxtStyle,
                                                    {
                                                        width: 40,
                                                        paddingLeft: 0,
                                                        textAlign: 'center',

                                                    }]}>

                                                        {((item?.list[0]?.main?.temp) - 273.15).toFixed(1)}
                                                    </Text>
                                                </View>

                                            </View>
                                            <View style={styles.innerBox}>
                                                <View style={{
                                                    width: '50%',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-start'
                                                }}
                                                >
                                                    <Image
                                                        source={require('../../assets/images/visible.png')}
                                                        resizeMode="cover"
                                                        style={styles.iconStyle}
                                                    />
                                                    <Text style={styles.innerTxtStyle}>
                                                        Visibility : {item?.list[0]?.visibility}m
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    width: '50%',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    paddingRight: 10,
                                                }}>

                                                    <Image
                                                        source={require('../../assets/images/humidicon.png')}
                                                        resizeMode="cover"
                                                        style={styles.iconStyle}
                                                    />
                                                    <Text style={[styles.innerTxtStyle, {
                                                        textAlign: 'left',
                                                        width: 64,
                                                        paddingLeft: 1
                                                    }]}>
                                                        Himidity
                                                    </Text>
                                                    <Text style={{ color: 'white' }}>
                                                        :
                                                    </Text>
                                                    <Text style={[styles.innerTxtStyle,
                                                    {
                                                        width: 40,
                                                        paddingLeft: 0,
                                                        textAlign: 'center',

                                                    }]}>

                                                        {(item?.list[0]?.main?.humidity).toFixed(0)}
                                                    </Text>
                                                </View>

                                            </View>


                                        </LinearGradient>

                                    </View>


                                )
                            })}

                        </View>

                    </View>
                </View >

            )
            }







        </ScrollView >



    )
}

export default List

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#382f51',
        paddingVertical: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    subContainer: {
        display: 'flex',
        width: '90%',
    },
    cardContainer: {
        width: '100%',
        marginVertical: 5,
    },
    gradientLayer: {
        borderRadius: 20,
    },
    dayStyle: {
        fontSize: 10,
        alignSelf: 'flex-end',
        paddingRight: 10,
        paddingTop: 5,
        color: '#fff'
    },
    cityBox: {
        fontSize: 18,
        // paddingTop: 5,
        paddingBottom: 10,
        paddingStart: 5,
        fontWeight: '700',
        color: '#fff',
        alignSelf: "center"
    },
    innerBox: {
        paddingStart: 5,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // width: '50%'
    },
    innerTxtStyle: {
        fontWeight: '400',
        color: '#fff',
        fontSize: 12,
    },
    iconStyle: {
        width: 10,
        height: 10,
        marginRight: 2,
    }
})