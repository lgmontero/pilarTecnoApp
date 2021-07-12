import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


export default class Profile extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          style={{ height }}
          source={require('../assets/images/patron5.jpg')}
        >

          <View >
            <ImageBackground
              style={styles.base}
              source={require('../assets/images/tituloperfil.png')}
            >
              <Text style={styles.text}>
                Seccion Perfil
              </Text>
            </ImageBackground>

          </View>


        </ImageBackground>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    margin: width / 10,
    height: width / 8,
    width: width / 1.2,        
  },
  base: {
    flexDirection: 'column-reverse',
  },

})