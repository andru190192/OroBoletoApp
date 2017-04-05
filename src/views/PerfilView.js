import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

export default class PerfilView extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>PerfilView</Text>
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
