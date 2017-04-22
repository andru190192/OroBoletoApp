import React, { Component } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { getFormasPagos } from '../api-client'
import PaymentList from '../components/PaymentList'
const parameters = require('../parameters')

export default class PaymentView extends Component {
  state = {
    payments: [],
    mensaje:null
  }

  componentDidMount () {
    getFormasPagos(parameters.USER.cedulaRuc).then(data => {
      this.setState({ payments: data.formasPago })
    }).catch(err => {
      this.setState ({mensaje: 'No tiene Tarjetas Registrada'})
    })
  }

  
  _renderMensajeLista() {
       if (this.state.mensaje !== null) {
           return (<Text style={styles.mensaje}>{this.state.mensaje}</Text>);
       }
   }

  render () {
    return (
      <View style={styles.container}>
          <View style={styles.containerInterno}>
            <Text style={styles.titulo}>LISTA DE TARJETA</Text>
          </View>
          {this._renderMensajeLista()}
          <PaymentList payments={this.state.payments} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3'

  },
  containerInterno: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  mensaje: {
    margin: 30,
    alignSelf: 'center',
  }
})
