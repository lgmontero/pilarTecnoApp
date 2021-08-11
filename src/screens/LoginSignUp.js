import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Image, Text, Alert, TouchableOpacity, View } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import TextInput from '../utils/ImputValidator';
import { nameValidator } from '../utils/NameValidator';
import { emailValidator } from '../utils/EmailValidator';
import { passwordValidator } from '../utils/PassValidator';
import { Button } from 'react-native-paper';


const LoginSignUp = (props) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState()

  const signUpFirebase = async ({ name, email, password }) => {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      firebase.auth().currentUser.updateProfile({
        displayName: name,

      }).then(() => {
        Alert.alert('Usuario Creado!')
        props.navigation.navigate("SignIn");
      })
      return { user }
    } catch (error) {
      return {
        error: Alert.alert('e-mail en uso!'),
      }
    }
  }

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    setLoading(true)
    const response = await signUpFirebase({
      name: name.value,
      email: email.value,
      password: password.value,
    })
    if (response.error) {
      setError(response.error)
    }
    setLoading(false)
  }

  return (
    <LinearGradient colors={['#e9e4f0', '#D3CCE3', '#373B44']} style={styles.body}

    >
      <Image source={require('../assets/images/logo.png')} style={styles.image} />
      <Text style={styles.textIn} > Create a new user </Text>

      <TextInput
        label="Enter your name"
        style={styles.input}
        Value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

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
          onPress={onSignUpPressed}>

          <Text style={styles.textButton} >Sing Up</Text>

        </Button>

        <TouchableOpacity
          style={styles.link}
          onPress={() => props.navigation.navigate("SignIn")}>

          <Text style={styles.linkText}>Cancel</Text>

        </TouchableOpacity>

      </View>
      
    </LinearGradient>

  )

}

export default (LoginSignUp)

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
