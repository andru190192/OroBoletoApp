import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
const parameters = require('../parameters')
import Button from '../components/Button'

export default class FacturaView extends Component {
  handleComprar () {
    Alert.alert('OroTicket - Compra Exitosa', `La factura se envio a su correo ${parameters.USER.email}`)
    Actions.dashboard()
  }

  render () {
    return (
      <View style={styles.grupoVertical}>
        <View style={styles.grupoHorizontal}>
          <Image
            source={{uri: `${parameters.URL}${this.props.logo}`}}
            style={styles.logo} />
        </View>
        <View style={styles.grupoHorizontal}>
          <View >
            <Text style={styles.texto}>Cooperativa:</Text>
            <Text style={styles.texto}>Nombre:</Text>
            <Text style={styles.texto}>Cedula:</Text>
            <Text style={styles.texto}>Fecha:</Text>
            <Text style={styles.texto}>Salida:</Text>
            <Text style={styles.texto}>Destino:</Text>
            <Text style={styles.texto}>Asiento:</Text>
            <Text style={styles.texto}>Hora:</Text>
            <Text style={styles.texto}>Total a Pagar:</Text>
          </View>
          <View >
            <Text style={styles.datos}>{this.props.cooperativa}</Text>
            <Text style={styles.datos}>{`${parameters.USER.apellido} ${parameters.USER.nombre}`}</Text>
            <Text style={styles.datos}>{parameters.USER.cedulaRuc}</Text>
            <Text style={styles.datos}>{this.props.fecha}</Text>
            <Text style={styles.datos}>{this.props.ciudadSalida}</Text>
            <Text style={styles.datos}>{this.props.ciudadDestino}</Text>
            <Text style={styles.datos}>{this.props.asientoNombre}</Text>
            <Text style={styles.datos}>{this.props.hora}</Text>
            <Text style={styles.datos}>{`$ ${this.props.valor}`}</Text>
          </View>
        </View>
        <View style={styles.grupoHorizontal}>
          <Button
            primary
            text='Comprar'
            icon='shopping-cart'
            onPress={this.handleComprar} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  grupoVertical: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#F3F3F3'
  },
  grupoHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1
  },
  logo: {
    width: 350,
    height: 150,
    paddingVertical: 10
  },
  texto: {
    color: '#1E70B8',
    fontSize: 16,
    fontWeight: 'bold',
    height: 20
  },
  datos: {
    color: '#F49A00',
    fontSize: 14,
    height: 20,
    paddingTop: 2
  }
})
