import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


export default class Home extends React.Component {

  _onHomePress = () => {
    Alert.alert(
      "Hola",
      "Ya te encuentras ahí",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          style={{ height }}
          source={require('../assets/images/patron1.jpg')}
        >
          <View style={{ flexDirection: 'column', height, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>

              <TouchableOpacity
                onPress={() => this._onHomePress()}

              >
                <ImageBackground
                  style={[styles.button, { backgroundColor: 'rgba(60, 179, 113, 0.95)' }]}
                  imageStyle={{ borderRadius: 20 }}
                  source={require('../assets/images/btn1.jpg')}
                >
                  <Text style={styles.text}>
                    Principal
                  </Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <ImageBackground
                  style={[styles.button, { backgroundColor: 'rgba(238, 0, 238, 0.95)' }]}
                  imageStyle={{ borderRadius: 20 }}
                  source={require('../assets/images/btn2.jpg')}
                >

                  <Text style={styles.text}>
                    Perfil
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Posts")}
              >
                <ImageBackground style={[styles.button, { backgroundColor: 'rgba(255, 165, 0, 0.95)' }]}
                  imageStyle={{ borderRadius: 20 }}
                  source={require('../assets/images/btn3.jpg')}
                >
                  <Text style={styles.text}>
                    Posteos
                  </Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Map")}
              >
                <ImageBackground style={[styles.button, { backgroundColor: 'rgba(0, 165, 188, 0.95)' }]}
                  imageStyle={{ borderRadius: 20 }}
                  source={require('../assets/images/btn4.jpg')}

                >
                  <Text style={styles.text}>
                    Mapa
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
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
    color: '#ffff',
    textAlign: 'center',
    textShadowColor: '#0000',
  },
  button: {
    margin: width / 20,
    height: width / 4.2,
    width: width / 2.5,
    marginVertical : width/ 50,
    
    borderRadius: 25,
    justifyContent: 'center',
    zIndex: 1
  }
})