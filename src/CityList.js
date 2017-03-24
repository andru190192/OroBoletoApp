import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'

export default class CooperativaDetailView extends Component {

  _onPressButton () {
    Actions.home()
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.combo} onPress={this._onPressButton}>
          <View style={styles.seleccion}>
            <Text style={styles.element}>{this.props.name}</Text>
          </View>
          <Icon style={styles.icon} name='chevron-right' size={16} color='#e74c3c' />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  seleccion: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20
  },
  combo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 50,
    borderColor: '#F0F0F0',
    borderWidth: 1
  },
  icon: {
    marginTop: 15,
    marginRight: 5
  },
  titulo: {
    margin: 20
  }
})
