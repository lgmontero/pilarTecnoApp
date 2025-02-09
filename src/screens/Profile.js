import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Button } from 'react-native-elements';
import { actions } from '../store';
import auth  from '@react-native-firebase/auth';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      photoURL: '',
      name: ''
    }

  }
  componentDidMount = () => {
    const { user } = this.props
    console.log('user profile: ' + JSON.stringify(user));
    this.setState({
      email: user.providerData[0].email,
      photoURL: user.providerData[0].photoURL,
      name: user.providerData[0].displayName
    })
  }
  

  render() {
    const { email, photoURL, name } = this.state
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.content}>
          <View style={{ alignItems: 'center' }}>
            <Avatar
              rounded
              source={{ uri:photoURL  }}
              size='xlarge'
            />
            <View style={styles.dataContainer}>
              <Text style={styles.infoText}>{email}</Text>
              <Text style={styles.infoText}>{name}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, top: 50, width: width * 0.5 }}>
          <Button title='Salir' 
          onPress={() => {
            auth()
              .signOut()
              .then(async () => {                  
                try {
                  await AsyncStorage.removeItem('isloged' , JSON.stringify(data.user));
                  this.props.setUser({ user: null })
                } catch (e) {
                  console.log('Exite error :' + e)
                
              }
              })
          }} />
        </View>
      </SafeAreaView>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  setUser: ({ user }) =>
    dispatch(actions.user.setUser({ user })),
})
const mapStateToProps = state => ({
  user: state.user.user
})
export default connect(mapStateToProps, mapDispatchToProps)((Profile))

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  content: {
    flex: 1,
    top: 50,
    justifyContent: 'center',
  },
  dataContainer: {
    top: 10,
    width
  },
  infoText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'grey'
  }
})
