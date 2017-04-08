import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight } from 'react-native'

export default class PaymentView extends Component {
  constructor (props) {
    super()
    this.state = {
      cliente: '0703865584',
      tipo: 'SE',
      nombreTarjeta: 'CARLOS AJILA M',
      numeroTarjeta: '1234567890',
      codigoSeguridad: '123',
      fechaVencimiento: '12/12',
      activo: ''
    }
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
