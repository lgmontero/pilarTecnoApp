// import React, { Component } from 'react';
import React, { Component, useState} from 'react';
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
import { Input, Icon, Button } from 'react-native-elements';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { actions } from '../store';
import { LoginButton, AccessToken,LoginManager } from 'react-native-fbsdk';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     
    }
    GoogleSignin.configure({
      webClientId: '334428375673-8v27scqf49ol6udlfh7cmh6aamddg6vp.apps.googleusercontent.com',
      offlineAccess:true
    });
    
  }

  login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  }

  register = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        //Once the user creation has happened successfully, we can add the currentUser into firestore
        //with the appropriate details.
        firestore().collection('users').doc(auth().currentUser.uid)
        .set({
            fname: '',
            lname: '',
            email: email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: null,
        })
        //ensure we catch any errors at this stage to advise us if something does go wrong
        .catch(error => {
            console.log('Something went wrong with added user to firestore: ', error);
        })
      })
      //we need to catch the whole sign up process if it fails too.
      .catch(error => {
          console.log('Something went wrong with sign up: ', error);
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);

  }
  onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
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
              style={styles.image2}
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

          >
            <Text style={styles.textIn}>
              Ingresar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonIn, { backgroundColor: 'rgba(27, 102, 135, 0.8)' }]}

            onPress={() => this.onGoogleButtonPress().then(async (data) => {
              console.log('Signed in with Google!');
              if (data) {
                 try {
                  await AsyncStorage.setItem('isloged', JSON.stringify(data.user));
                 
                } catch (e) {
                  console.log('Error de Logeo :' + e);
                }
                this.props.setUser(data.user);
                
              }
            }).catch(err => { console.log(err) })

            }

          >
            <Text style={styles.textIn}>
              Google
            </Text>
          </TouchableOpacity>

          {/* <LoginButton style={[styles.buttonface, { backgroundColor: 'rgba(27, 102, 135, 0.8)' }]}
          
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      console.log(data.accessToken.toString())
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => console.log("logout.")}>
            
            </LoginButton> */}
          <TouchableOpacity style={[styles.buttonIn, { backgroundColor: 'rgba(27, 102, 135, 0.8)' }]}

            onPress={() => this.onFacebookButtonPress().then(async (data) => {
              console.log('Signed in with Facebook!');
              if (data) {
                // console.log('res login: ' + JSON.stringify(data.user));
                try {
                  await AsyncStorage.setItem('isloged', JSON.stringify(data.user));
                } catch (e) {
                  console.log('Error de Logeo :' + e);
                }
                this.props.setUser(data.user);
                
              }
            }).catch(err => { console.log(err) })

            }

          >
            <Text style={styles.textIn}>
              Facebook
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
  buttonface: {
    marginLeft: 130,
    marginRight: 50,
    marginBottom: -50,
    paddingBottom: 3,
    borderRadius: 5,
    shadowColor: 'white',
    elevation: 10,
    margin: width / 30,
    height: width / 10,
  },

})

const mapDispatchToProps = dispatch => ({
  setUser: (data) =>
    dispatch(actions.user.setUser(data)),
})
const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)((Login))

