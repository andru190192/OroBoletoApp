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

  constructor() {
    super();
    this.state = {
      id : '',
      email : ''
    }
  }

  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.warn('datal: ', result.id);
    }
  };

  renderScene(result) {
     getPersona(result).then(
       us => {
         console.warn('us', us);
         if (us.status.toString() === '200') {
           Actions.root()
         }else if (us.status.toString() === '404') {
           Actions.persona()
         }
       }
     )

   }
   handlenLoginFinished = (error, result) => {
       if (error) {
         console.error(error)
       } else if (result.isCancelled) {
         alert("login is cancelled.");
       } else {
         AccessToken.getCurrentAccessToken().then((data) => {
                   //alert(data.accessToken.toString())
                   Actions.root()
                 }
         )
       }
     }
  // handlenLoginFinished = (error, result) => {
  //     if (error) {
  //       console.error(error)
  //     } else if (result.isCancelled) {
  //       alert("login is cancelled.");
  //     } else {
  //       AccessToken.getCurrentAccessToken()
  //       .then(data => {
  //           const infoRequest = new GraphRequest(
  //             '/me',
  //             {
  //               parameters: {
  //                 fields: { string: 'id, email, name, first_name, last_name' },
  //                 access_token: { string: data.accessToken }
  //               }
  //             },
  //             this._responseInfoCallback,
  //           );
  //           new GraphRequestManager().addRequest(infoRequest).start();
  //           this.renderScene('albertoajila2')
  //         }
  //       )
  //     }
  //   }

    render() {
      return (
        <View style={styles.container}>
          <Image source={require('./logo.png')} style={styles.logo} />
          <LoginButton
            readPermissions={["public_profile", "email"]}
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
