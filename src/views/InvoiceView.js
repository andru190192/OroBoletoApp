import React, { Component } from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'

export default class FacturaView extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>LISTADO DE FACTURAS</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: (Platform.OS === 'ios') ? 30 : 0
  },
  titulo: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
})
