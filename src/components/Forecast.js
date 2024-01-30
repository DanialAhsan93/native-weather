import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Citycard from './Citycard';
import Windspeed from './Windspeed';
import Visibility from './Visibility';



const Forecast = ({ isWeatherData }) => {
    const [dayOfWeek, setdayOfWeek] = useState([])
    // console.log(isWeatherData)

    useEffect(() => {
        const getDayName = (dayIndex) => {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
            return days[dayIndex];
        };

        const currentDay = new Date().getDay();
        const next7days = Array.from({ length: 7 }, (_, index) => {
            const nextDayIndex = (currentDay + index) % 7;
            return getDayName(nextDayIndex);
        });

        setdayOfWeek(next7days);
    }, []);


    // console.log(dayOfWeek)

    const ForecastCard = ({ item, index }) => {
        // console.log(item)
        const today = new Date().getDay()
        const dayOfIndex = (today + index) % 7
        const backgroundColor = dayOfIndex === today ? '#48319D' : 'rgba(72, 49, 157, 0.3)';

        return (

            <View style={[styles.mainCard, { backgroundColor }]}>
                <Text style={[styles.cardText, { marginTop: 10 }]}>
                    {dayOfWeek.length > index ? dayOfWeek[index] : ''}
                </Text>
                <Image
                    source={require('../../assets/images/cloudicon.png')}
                    resizeMode='cover'
                    style={styles.cardIcon}
                />
                <Text style={styles.cardText}>
                    {((item?.main.temp) - 273.15).toFixed(1)}°
                </Text>

            </View>





        )
    }

    return (
        <View style={styles.mainContainer}>

            {isWeatherData ? (
                <FlatList
                    data={isWeatherData.list.slice(0, 7)}
                    renderItem={ForecastCard}
                    keyExtractor={(item) => item.dt.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <ActivityIndicator size="large" style={{ marginTop: 50 }} />
            )}

            <View style={styles.subContainer}>

                <LinearGradient
                    colors={['rgba(72, 49, 157, 0)', 'rgba(72, 49, 157, 0.7)']}
                    style={styles.miniCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Citycard isWeatherData={isWeatherData} />
                    <View
                     style={{
                        width:'95%',
                        marginTop: 25,
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between'
                     }}
                    >
                        <Windspeed isWeatherData={isWeatherData}/>
                        <Visibility isWeatherData={isWeatherData} />
                    </View>

                </LinearGradient>

            </View>


        </View>


    )
}

export default Forecast

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: 50,
        width: '95%'
    },
    mainCard: {
        width: 45,
        height: 120,
        marginHorizontal: 10,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 0
    },
    cardIcon: {
        width: 28,
        height: 28,
        marginTop: 5,
    },
    cardText: {
        color: '#fff',
        marginTop: 30,
    },
    subContainer: {
        marginTop: 30,
        marginHorizontal: 20,
        height: 350,
        borderRadius: 20,

    },
    miniCard: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 20,
    },

})