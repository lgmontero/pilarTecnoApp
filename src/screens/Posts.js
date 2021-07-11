import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  ImageBackground,
  View,
} from 'react-native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


export default class Post extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          style={{ height }}
          source={require('../assets/images/workone.png')}
        >
          
            <View style={styles.base}>              
            <ImageBackground
              style={styles.base}
              source={require('../assets/images/titulopost.png')}
            >
                <Text style={styles.text}>
                  Seccion Posts
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
    color: '#000',
    textAlign: 'center',
    margin: width / 40,
    height: width / 8,
    width: width / 1.0,
  },
  base:{
    flexDirection: 'column-reverse',     
  },

})