import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class PaymentView extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>
          PaymentView
        </Text>
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
