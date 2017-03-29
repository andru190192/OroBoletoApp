import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

export default class CityList extends Component {

  render () {
    return (
      <View style={styles.seleccion}>
        <Text>{this.props.ciudad.nombre}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  seleccion: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20
  }
})
