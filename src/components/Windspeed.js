import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Windspeed = ({ isWeatherData }) => {
    return (
        <View style={styles.mainContainer}>
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.1)']}
                style={styles.gradientLayer}
            >
                <View style={styles.windContainer}>
                    <Image
                        source={require('../../assets/images/windicon.png')}
                        resizeMode="cover"
                        style={styles.iconStyle}
                    />
                    <Text style={styles.windText}>
                        Windspeed
                    </Text>
                </View>
                {
                    isWeatherData ? (
                        <Text
                            style={{
                                color: '#fff',
                                marginTop: 10,
                                marginStart: 5,
                            }}
                        >
                            {isWeatherData?.list[0]?.wind?.speed}km/h
                        </Text>

                    ) : (
                        <ActivityIndicator />
                    )
                }
                <View style={{ width: '85%', marginStart: 5, marginTop: 15, marginBottom:8 }}>
                    <LinearGradient
                        colors={['#4359b7', 'lightgrey', '#48319D']}
                        start={{ x: 0, y: 0 }} // Left
                        end={{ x: 1, y: 0 }}   // Right
                        style={styles.Line}
                    />

                </View>
            </LinearGradient>

        </View>
    )
}

export default Windspeed

const styles = StyleSheet.create({
    mainContainer: {
        width: '48%',
        // borderWidth: 1,
        // borderColor: 'white'
    },
    gradientLayer:{
        borderRadius: 10
    },
    windContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingStart: 5,
        marginTop: 5
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    windText: {
        color: '#fff',
        fontSize: 12,
        paddingStart: 5
    },
    Line: {
        width: '100%',
        height: 2,
    },
})