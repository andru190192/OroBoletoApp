import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight } from 'react-native'
import { setFormaPago } from '../api-client'
const parameters = require('../parameters')
export default class PaymentFormView extends Component {
  constructor (props) {
    super()
    // console.warn('props.payment', props.payment)
    if (props.payment === undefined) {
      this.nameBotton = 'GUARDAR'
      this.state = {
        cliente: parameters.USER.cedulaRuc,
        tipo: 'SE',
        nombreTarjeta: 'CARLOS AJILA M',
        numeroTarjeta: '123456789012345',
        codigoSeguridad: '123',
        fechaVencimiento: '2017-12-12 00:00:00',
        activo: 'true',
        id: 6
      }
    } else {
      this.nameBotton = 'MODIFICAR'
      this.state = {
        cliente: props.payment.cliente,
        tipo: props.payment.tipo,
        nombreTarjeta: props.payment.nombreTarjeta,
        numeroTarjeta: props.payment.numeroTarjeta,
        codigoSeguridad: props.payment.codigoSeguridad,
        fechaVencimiento: props.payment.fechaVencimiento,
        activo: props.payment.activo,
        id: props.payment.id
      }
    }
  }
  handleAction () {
    setFormaPago(this.state)
      .then(data => {
        console.warn('data', data)
      })
      .catch(err => {
        console.warn(`${err}`)
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>
          PaymentView
        </Text>

        <TextInput
          style={styles.input}
          placeholder='Cliente'
          value={this.state.cliente}
          onChangeText={(cliente) => this.setState({ cliente })}
        />
        <TextInput
          style={styles.input}
          placeholder='Tipo'
          value={this.state.tipo}
          onChangeText={(tipo) => this.setState({ tipo })}
        />
        <TextInput
          style={styles.input}
          placeholder='Nombre'
          value={this.state.nombreTarjeta}
          onChangeText={(nombreTarjeta) => this.setState({ nombreTarjeta })}
        />

        <TextInput
          style={styles.input}
          placeholder='Numero de la Tarjeta'
          value={this.state.numeroTarjeta}
          onChangeText={(numeroTarjeta) => this.setState({ numeroTarjeta })}
        />

        <TextInput
          style={styles.input}
          placeholder='Codigo de seguridad'
          value={this.state.codigoSeguridad}
          onChangeText={(codigoSeguridad) => this.setState({ codigoSeguridad })}
        />
        <TouchableHighlight
          style={styles.buttonAction}
          onPress={() => this.handleAction()}>
          <Text style={styles.textButtom}>GUARDAR</Text>
        </TouchableHighlight>

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
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15
  },
  icon: {
    marginTop: 5,
    marginRight: 5
  },
  titulo: {
    margin: 20
  },
  buttonAction: {
    backgroundColor: 'skyblue',
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    height: 40,
    width: 150

  },
  textButtom: {
    textAlign: 'center',
    color: 'white'
  }
})
