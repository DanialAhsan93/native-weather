import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Citycard = ({ isWeatherData }) => {
    return (
        <View style={styles.mainContainer}>
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.1)']}
                style={styles.gradientLayer}
            >
                <View style={styles.cityContainer}>
                    <Image
                        source={require('../../assets/images/cityicon.png')}
                        resizemode="cover"
                        style={styles.cityIcon}
                    />
                    {isWeatherData ? (
                        <Text style={styles.mainText}>
                            {isWeatherData?.city?.name}
                        </Text>
                    ) :
                        (
                            <ActivityIndicator size={14} color="#fff" />
                        )
                    }

                </View>

                <Text style={styles.mainHeader}>
                    Temperature
                </Text>
                {
                    isWeatherData ? (
                        <Text style={[styles.mainHeader, { marginTop: 5, marginStart: 14 }]}>
                            {((isWeatherData?.list[0]?.main?.temp) - 273.15).toFixed(2)}°
                        </Text>

                    ) : (
                        <ActivityIndicator size={14} color="#fff"/>
                    )
                }

                <View style={{ width: '85%', marginStart: 10, marginTop: 15 }}>
                    <LinearGradient
                        colors={['#4359b7', 'lightgrey', '#48319D']}
                        start={{ x: 0, y: 0 }} // Left
                        end={{ x: 1, y: 0 }}   // Right
                        style={styles.Line}
                    />

                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailtext}>
                        Humidity : {isWeatherData?.list[0]?.main?.humidity}
                    </Text>
                    <Text style={styles.detailtext}>
                        Clouds : {isWeatherData?.list[0]?.weather[0]?.description}
                    </Text>
                </View>


            </LinearGradient>
        </View>
    )
}

export default Citycard

const styles = StyleSheet.create({
    mainContainer: {
        width: '95%',
        marginTop: 15,
    },
    gradientLayer: {
        borderRadius: 20,
    },
    cityContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 5,
        marginTop: 8,

    },
    mainText: {
        color: 'white',
        width: '100%',
        fontSize: 12,
        paddingStart: 5,
    },
    cityIcon: {
        width: 10,
        height: 10,
    },
    mainHeader: {
        color: '#fff',
        fontSize: 20,
        marginStart: 10,
        marginTop: 10,
    },
    Line: {
        width: '100%',
        height: 2,
    },
    detailsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 10,

    },
    detailtext: {
        color: '#fff',
        fontSize: 12
    },

})