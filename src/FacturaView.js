import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

export default class FacturaView extends Component {

  render () {
    return (
      <View style={styles.container}>
        <Text>FacturaView</Text>
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
  }
})
