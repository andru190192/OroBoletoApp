/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
} from 'react-native';

import FBSDK , {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

const fbPer = ["public_profile", "email"]

import {Actions} from 'react-native-router-flux'
import { getPersona } from './api-client'

export default class LoginView extends Component {

  _responseInfoCallback(error, result) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      getPersona(result.id).then(
        credential => {
          if (credential.status.toString() === '200') {
            Actions.root()
          }else if (credential.status.toString() === '404') {
            Actions.persona({'usuarioFb':result})
          }
        }
      )
    }
  };
componentWillMount(){
  this.authenticateUser()
}
 authenticateUser(){
   AccessToken.getCurrentAccessToken().then((data) => {
     if (data){
       const { accessToken } = data
       const infoRequest = new GraphRequest(
         '/me',
         {
           parameters: {
             fields: { string: 'id, email, first_name, last_name' },
             access_token: { string: accessToken }
           }
         },
         this._responseInfoCallback,
       );
       new GraphRequestManager().addRequest(infoRequest).start();
     }
   })
 }

 handlenLoginFinished = (error, result) => {
     if (error) {
       console.error(error)
     } else if (result.isCancelled) {
       alert("login is cancelled.");
     } else {
        this.authenticateUser()
     }
  }

  render() {
      return (
        <View style={styles.container}>
          <Image source={require('./logo.png')} style={styles.logo} />
          <LoginButton
            readPermissions={["public_profile", "email"]}
            onLoginFinished={this.handlenLoginFinished}/>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 50
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  }
});
//onLoginFinished={() => alert("logout.")}
  //<Text>{this.state.credentials && this.state.credentials.nombre}</Text>
