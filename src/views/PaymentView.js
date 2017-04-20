import React, { Component } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { getFormasPagos } from '../api-client'
import PaymentList from '../components/PaymentList'
const parameters = require('../parameters')
export default class PaymentView extends Component {
  state = {
    payments: []
  }

  componentDidMount () {
    getFormasPagos(parameters.USER.cedulaRuc).then(data => {
      this.setState({ payments: data.formasPago })
    }).catch(err => {
      Alert.alert('OroTicket', err.message)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>LISTA DE TARJETA</Text>
        <PaymentList payments={this.state.payments} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingTop: 20
  },
  titulo: {
    margin: 20,
    alignSelf: 'center'
  }

})
