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
import { LinearGradient } from 'expo-linear-gradient';
import { Input, Icon } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
// const image = {require('../assets/images/workone.png')}



export default class Login extends React.Component {

  render() {

    return (

      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/images/workone.png')}
          style={styles.image}
        >
          <Text style={styles.text}> Login </Text>
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
                placeholder = 'username'
               
                

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
         
          <TouchableOpacity style={[styles.buttonIn, { backgroundColor: 'rgba(27, 102, 135, 0.8)' }]}>
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
  base: {
    backgroundColor: 'rgba(255,255,255, 0.95)',
    shadowColor:'white',
    shadowOffset: {width: 9, height: 9},
    elevation: 18,
    shadowOpacity: 0.2,
    borderRadius: 5,
    margin: width / 8,
    height: width / 7,
    marginVertical : width/ 50,
  },
  text: {
    marginTop: -280,
    fontSize: 25,
    fontWeight: 'bold',
    color: `#1c1c1c`,
    textAlign: 'center',
    height: width / 3,
    },
  textIn: {
    margin: width / 50,
    fontSize: 18,
    fontWeight: 'bold',
    color: `white`,
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
    
  },
  buttonSinUp: {
    marginTop: -40,
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 70,
    paddingBottom: 3,
    borderRadius: 2,
    justifyContent: 'center',
  },
})