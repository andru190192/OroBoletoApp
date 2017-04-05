import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { signIn } from '../api-client'
import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk'
const {GraphRequest, GraphRequestManager} = FBSDK
const config = require('../parameters')

export default class LoginView extends Component {
  componentWillMount () {
    this.authenticateUser()
  }

  handleLogin = (error, result) => {
    if (error) console.error(error)
    else if (result.isCancelled) console.warn('login is cancelled.')
    else this.authenticateUser()
  }

  authenticateUser () {
    AccessToken.getCurrentAccessToken()
    .then(data => {
      if (data) {
        new GraphRequestManager().addRequest(new GraphRequest(
          '/me',
          {
            parameters: {
              fields: { string: 'id, email, first_name, last_name' },
              access_token: { string: data.accessToken }
            }
          },
          this.responseInfo,
        )).start()
      }
    })
  }

  responseInfo (error, usuario) {
    if (error) console.warn('Error fetching data: ' + error.toString())
    else {
      signIn(usuario.id)
      .then(data => {
        config.USER = data.persona
        config.TOKEN = data.token
        Actions.root()
      })
      .catch(err => {
        console.warn(err.statusCode)
        if (err.statusCode === 404) Actions.perfil({ usuario })
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('../static/images/logo.png')} style={styles.logo} />
        <LoginButton readPermissions={['public_profile', 'email']} onLoginFinished={this.handleLogin} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 50
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20
  }
})
