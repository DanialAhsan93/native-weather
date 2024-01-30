import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

const About = () => {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Text style={styles.mainHeader}>Weather App</Text>
        <Text style={styles.paraStyle}>I am a Frontend developer</Text>
        <View style={styles.imgContainer}>
          <Image
            style={styles.imgStyle}
            source={require('../../assets/images/logocolor.png')}
            resizemode="cover" />
        </View>
        <View style={styles.aboutLayout}>
          <Text style={styles.aboutSubHeader}>
            About me
          </Text>
          <Text style={[styles.paraStyle, styles.paraabout]}>
          As a frontend developer, I specialize in crafting engaging and intuitive user interfaces.
          My passion lies in creating seamless and visually appealing web and mobile experiences.
          Through this project, I showcased my ability to merge functionality with aesthetics, providing users with
          a dynamic and visually pleasing weather experience. With a keen eye for detail 
          and a dedication to user-centric design, I bring creativity and technical expertise to every project.

          </Text>
        </View>
        <Text style={styles.mainHeader}>
          Follow me on Social Network
        </Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => Linking.openURL("https://www.pinterest.com/login/")}
          >
            <Image
              style={styles.iconStyle}
              source={require('../../assets/images/pinterest.png')}
              resizemode="cover"
            />

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => Linking.openURL("https://www.youtube.com/")}
          >
            <Image
              style={styles.iconStyle}
              source={require('../../assets/images/youtube.png')}
              resizemode="cover"
            />

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => Linking.openURL("https://www.whatsapp.com/")}
          >
            <Image
              style={styles.iconStyle}
              source={require('../../assets/images/whatsapp.png')}
              resizemode="cover"
            />

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => Linking.openURL("https://www.instagram.com/")}
          >
            <Image
              style={styles.iconStyle}
              source={require('../../assets/images/instagram.png')}
              resizemode="cover"
            />

          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>

  )
}

export default About

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#382f51',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainHeader: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'uppercase',
    paddingBottom: 20,
    marginTop: 50,
    lineHeight: 30,
  },
  paraStyle: {
    fontSize: 16,
    color: '#fff',
    paddingBottom: 30,
  },
  imgContainer: {
    display: 'flex',
  },
  imgStyle: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  aboutLayout: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 30,
    marginVertical: 30,
  },
  aboutSubHeader: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#382f51',
    marginVertical: 15,
    alignSelf: 'center',
    lineHeight: 30,
  },
  paraabout: {
    color: '#382f51',
  },
  menuContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginBottom: 50,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
})