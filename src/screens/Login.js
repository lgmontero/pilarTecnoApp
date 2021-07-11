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
  Alert,
  TextInputComponent
} from 'react-native';
import { Input, Icon } from 'react-native-elements';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default class Login extends React.Component {

  _onLoginPress = () => {
    Alert.alert(
      "Hola",
      "Aun no puedes ingresar",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }
  render() {

    return (

      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/images/patron7.jpg')}
          style={styles.image}
        >
          <View>
          <ImageBackground
          source={require('../assets/images/titulo7.png')}
          style={ styles.image2 }
        >
          <Text style={styles.text}> Login </Text>

          </ImageBackground>
          </View>
          <View>
            <View style={styles.base} >
              <Input
                style={styles.input}
                leftIcon=
                {
                  <Icon
                    name='user-alt'
                    type="font-awesome-5"
                    size={22}
                    color='gray'

                  />
                }
                placeholder='username'
              />
            </View>
            <View style={styles.base}>
              <Input style={styles.input}
                placeholder=" Enter your password "
                secureTextEntry={true}
                leftIcon={<Icon
                  name='lock'
                  size={25}
                  color='gray' />}
              />
            </View>
          </View>

          <TouchableOpacity style={[styles.buttonIn, { backgroundColor: 'rgba(27, 102, 135, 0.8)' }]}
          onPress={() => this._onLoginPress()}
          >
            <Text style={styles.textIn}>
              Ingresar
            </Text>
          </TouchableOpacity>

        </ImageBackground>
      </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  image2: {
    flexDirection: 'column',
    width: width / 1.0,
    height: width / 3,
    marginTop: -200,
     
  },
  base: {
    backgroundColor: 'rgba(255,255,255, 0.95)',
    shadowColor: 'white',
    shadowOffset: { width: 9, height: 9 },
    elevation: 18,
    shadowOpacity: 0.2,
    borderRadius: 5,
    margin: width / 8,
    height: width / 7,
    marginVertical: width / 50,
  },
  text: {
    marginTop: 45,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    
   
  },
  textIn: {
    margin: width / 50,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    marginTop: 2.8,
    fontSize: 15,
    color: '#1c1c1c',
    textAlign: 'center',
    paddingBottom: 3,
    backgroundColor: 'rgba(124, 150, 177, 0.5)',
    borderRadius: 2,
    height: width / 8,

  },
  buttonIn: {
    marginLeft: 230,
    marginRight: 50,
    marginBottom: 90,
    paddingBottom: 3,
    borderRadius: 5,
    shadowColor: 'white',
    elevation: 10,

  },
 
})