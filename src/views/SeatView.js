import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class PaymentView extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>{this.props.turno.cooperativa}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
