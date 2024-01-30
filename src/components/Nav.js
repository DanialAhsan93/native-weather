import { StyleSheet, Text, View, ImageBackground, Image, Touchable } from 'react-native'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from "@react-navigation/native"


const Nav = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source={require('../../assets/images/menusheet.png')}
                resizeMode="cover"
                style={styles.ImageBackground}
            >
                <View style={styles.contentContainer}>
                    <TouchableOpacity
                     onPress={() => navigation.navigate("About")}
                    >
                        <Image
                            source={require('../../assets/images/Menu.png')}
                            style={styles.menuIcon}

                        />

                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/images/btnplus.png')}
                            style={styles.menuIcon}

                        />

                    </TouchableOpacity>
                    <TouchableOpacity
                     onPress={() => navigation.navigate("List")}
                    >
                        <Image
                            source={require('../../assets/images/List.png')}
                            style={styles.menuIcon}
                        />

                    </TouchableOpacity>


                </View>
            </ImageBackground>
        </View>

    )
}

export default Nav

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
    },
    ImageBackground: {
        width: '100%',
        height: 100,
    },
    contentContainer: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: "space-evenly",
        height: 100,
        paddingTop:30,
    },
    menuIcon:{
        width: 40,
        height: 40
    },
})