import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
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
    })
  }

  render () {
    let payments = this.state.payments
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>LISTA DE TARJETA</Text>
        <PaymentList payments={payments} />
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
    margin: 20
  }

})
