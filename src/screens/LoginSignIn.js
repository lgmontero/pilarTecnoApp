import React, { useState } from 'react';
import {  Image, StyleSheet, Alert, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { firebase } from '@react-native-firebase/auth';
import TextInput from '../utils/ImputValidator';
import { connect } from 'react-redux';
import { actions } from '../store';
import { emailValidator } from '../utils/EmailValidator';
import { passwordValidator } from '../utils/PassValidator';
import { Button } from 'react-native-paper';


const LoginSignIn = (props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState()
  
  const signInFirebase = async ({ email, password }) => {
    try {
      const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        
        props.setUser(data.user)
      })
     
      return { user }
    } catch (error) {
      return {
        error: Alert.alert((error.message)),
        
      }
      
    }
  }

  const onSignInPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    setLoading(true)
      await signInFirebase({
      email: email.value,
      password: password.value,
    })
    
    setLoading(false)
  }

  return (
    <LinearGradient colors={['#e9e4f0', '#D3CCE3', '#373B44']} style={styles.body}

    >
      <Image source={require('../assets/images/logo.png')} style={styles.image} />
      <Text style={styles.textIn} > Sign In </Text>

      <TextInput
        label="Enter your email"
        style={styles.input}
        Value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        label="Enter your password"
        style={styles.input}
        Value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={true}
      />

      <View style={styles.base}>

        <Button
          style={styles.button}
          loading={loading}
          mode="contained"
          onPress={onSignInPressed}>

          <Text style={styles.textButton} >Sing In</Text>

        </Button>

        <TouchableOpacity
          style={styles.link}          
          onPress={() => props.navigation.navigate("SignUp")} 
          >

          <Text style={styles.linkText}>Register</Text>

        </TouchableOpacity>

      </View>
      
    </LinearGradient>


  )

}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'space-between', //'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' |
    alignItems: 'center',
    flexDirection: 'column',  //'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: -5,
  },
  textIn: {
    fontSize: 28,
    fontWeight: '300',
    color: 'black',
    textAlign: 'auto',
    textShadowColor: 'white',
    margin: 20
  },

  input: {
    marginLeft: 28,
    marginRight: 28,
    fontSize: 22,
    textAlign: 'center',                        //'auto' | 'left' | 'right' | 'center' | 'justify' |
  },
  base: {
    marginTop: -5,
    marginRight: 120,
    marginLeft: -97,
    paddingBottom: 200
  },

  button: {
    backgroundColor: 'rgba(255, 125, 0, 0.75)',
    borderRadius: 5,
    elevation: 5,
    margin: 12,
    paddingBottom: 2,
  },
  textButton: {
    fontSize: 20,
    fontFamily: 'Roboto',
    textAlign: 'justify',                   //'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
    fontWeight: 'bold',                      //'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
    margin: 8,
    color: 'black',

  },
  linkText: {
    textDecorationLine: 'underline',        //'none' | 'underline' | 'line-through' | 'underline line-through' | undefined;
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Roboto',
    marginLeft: 29,
  },
  link: {
    marginTop: 28,
    marginLeft: 150,
    paddingBottom: 200,
    flexDirection: 'row-reverse',           //'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
    position: 'absolute'                  //'absolute' | 'relative' | undefined;

  },


})
const mapDispatchToProps = dispatch => ({
  setUser: (data) =>
      dispatch(actions.user.setUser(data)),
})
const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)((LoginSignIn))
