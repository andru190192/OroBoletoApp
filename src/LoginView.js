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
} from 'react-native';

import FBSDK , {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';


import {Actions} from 'react-native-router-flux'

export default class LoginView extends Component {

  handlenLoginFinished =   (error, result) => {
      if (error) {
        console.error(error)
      } else if (result.isCancelled) {
        alert("login is cancelled.");
      } else {
        AccessToken.getCurrentAccessToken().then(
          (data) => {
                    //alert(data.accessToken.toString())
                    Actions.root()
          }
        )
      }
    }


    render() {
    return (
      <View style={styles.container}>
        <Image source={require('./logo.png')} style={styles.logo} />
        <LoginButton
          redPermissions={["public_profile", 'email']}
          onLoginFinished={this.handlenLoginFinished}
          onLogoutFinished={() => alert("logout.")}/>
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
