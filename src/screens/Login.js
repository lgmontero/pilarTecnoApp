import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import { GoogleSignin,} from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { actions } from '../store';


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    GoogleSignin.configure({
      webClientId: '334428375673-8v27scqf49ol6udlfh7cmh6aamddg6vp.apps.googleusercontent.com',
      offlineAccess: true
    });

  }

  onGoogle = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);

  }
  onFacebook = async () => {
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

      <LinearGradient colors={['#859398', '#D3CCE3', '#283048']} style={styles.body} >

        <Text style={styles.text} > Access </Text>
        <View style={styles.base}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignIn")}>

            <LinearGradient
              colors={['#fc4a1a', '#fc4a1a','#F09819']}
              style={styles.button}
              start={{ x: 0.1, y: 0.35 }}
              end={{ x: 0.5, y: 3.0 }}
              locations={[0.0, 0.8, 0.7]}
              
            >
              <View>
                <Image source={require('../assets/images/logon.png')} style={styles.image} />
                <Text style={styles.textFi}>
                  Sign in Whith Firebase
                </Text>
              </View>
            </LinearGradient>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onGoogle().then(async (data) => {
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

            } >
            <LinearGradient
             style={styles.button}
             start={{x: 0.1, y: 0.25}}
             end={{x: 0.5, y: 3.0}}
             locations={[0.0, 0.8, 0.7]}
             colors={['#2193b0', '#0072ff', '#0052D4']}
             
            >
              <View>
                <Image source={require('../assets/images/google.png')} style={styles.image} />
                <Text style={styles.textFi}>
                  Sign in Whith Google
                </Text>
              </View>
            </LinearGradient>

          </TouchableOpacity >

          <TouchableOpacity 

            onPress={() => this.onFacebook().then(async (data) => {
              console.log('Signed in with Facebook!');
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
             <LinearGradient
              style={styles.button}
              start={{x: 0.1, y: 0.35}}
              end={{x: 0.5, y: 3.0}}
              locations={[0.0, 0.8, 0.6]}
              colors={['#4c669f', '#3b5998', '#192f6a']}
                            
            >
              <View>
                <Image source={require('../assets/images/facebook.png')} style={styles.image} />
                <Text style={styles.textFi}>
                  Sign in Whith Facebook
                </Text>
              </View>
            </LinearGradient>

          </TouchableOpacity>
        
        </View>

      </LinearGradient>

    )
  }
}
const mapDispatchToProps = dispatch => ({
  setUser: (data) =>
    dispatch(actions.user.setUser(data)),
})
const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)((Login))

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2193b0',
    flexDirection: 'column',
  },
  image: {
    width: 40,
    height: 40,
    left: -36,
    margin: 2,
    position: 'absolute',

  },
  text: {
    fontSize: 38,
    fontWeight: '300',
    color: 'black',
    textAlign: 'auto',
    textShadowColor: 'white',
    margin: 100
  },
  base: {
    marginVertical: 100,
    paddingBottom: 200
  },
  button: {
    paddingLeft: 35,
    paddingRight: 18,
    borderRadius: 5,
    shadowColor: 'white',
    elevation: 10,
    margin: 12,
    paddingBottom: 10,
    height: width / 7,
    
  },
  textFi: {
    fontSize: 22,
    fontFamily: 'Roboto',
    textAlign: 'right',             //'auto' | 'left' | 'right' | 'center' | 'justify' |
    fontWeight: '100',          //'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' |
    margin: 8,
    color: '#ffffff',
    textAlignVertical:'center',    // 'auto' | 'top' | 'bottom' | 'center' | 
    backgroundColor: 'transparent'

  },
  
})
