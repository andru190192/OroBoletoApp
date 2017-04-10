import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { getFormasPagos } from '../api-client'
import PaymentList from '../components/PaymentList'
import { Actions } from 'react-native-router-flux'

export default class PaymentView extends Component {
  state = {
    payments: []
  }
  componentDidMount () {
    getFormasPagos('0703865584').then(data => {
      this.setState({ payments: data.formasPago })
    })
  }
  handleAction(){
    Actions.PaymentFormView()
  }

  render () {
    let payments = this.state.payments
    return (
      <View style={styles.container}>
      <Text style={styles.titulo}>BUSCA TU BOLETO</Text>
        <TouchableHighlight
          style={styles.buttonAgregar}
          onPress={() => this.handleAction()}>
          <Text style={styles.textButtom}>+</Text>
        </TouchableHighlight>
        <PaymentList payments={payments} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 20
  },
  titulo: {
    margin: 20
  },
  buttonAgregar: {
    backgroundColor: 'skyblue',
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    height: 40,
    width: 150

  },
  textButtom: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  }

})
