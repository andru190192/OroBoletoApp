import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'

export default class OroTicket extends Component {

  _onPressButton () {
    Actions.root()
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('./logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={this._onPressButton} style={styles.btnFacebook}>
          <Icon name='logo-facebook' size={24} color='#FFFFFF' />
        <Text style={{marginLeft: 5, marginTop: 2, color: '#FFFFFF'}}>Inicio assa de Sesi&oacute;n</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 50
  },
  btnFacebook: {
    flexDirection: 'row',
    backgroundColor: '#3B5998',
    padding: 7
  }
})
