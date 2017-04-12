import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableHighlight } from 'react-native'
import { setFormaPago } from '../api-client'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
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
        nombreTarjeta: '',
        numeroTarjeta: '',
        codigoSeguridad: '',
        fechaVencimiento: '',
        activo: ''
      }
    } else {
      this.nameBotton = 'MODIFICAR'
      this.state = {
        cliente: props.payment.cliente,
        tipo: props.payment.tipo,
        nombreTarjeta: props.payment.nombre_tarjeta,
        numeroTarjeta: props.payment.numero_tarjeta,
        codigoSeguridad: props.payment.codigo_seguridad,
        fechaVencimiento: moment(props.payment.fecha_vencimiento).format('MM/YYYY'),
        activo: props.payment.activo,
        id: props.payment.id
      }
    }
  }
  handleAction () {
    this.state.activo = 'TRUE'
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
        <View>
          <Image source={require('../static/images/tarjetaCredito4.png')} style={styles.logo} />
          <Text style={styles.titulo}>
            Datos de Tarjeta de Credito
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name='user-o' size={25} color='#e74c3c' />
          </View>
          <View style={styles.txtContainer}>
            <TextInput
              style={styles.input}
              placeholder='Nombre'
              value={this.state.nombreTarjeta}
              onChangeText={(nombreTarjeta) => this.setState({ nombreTarjeta })}
                />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name='credit-card' size={25} color='#e74c3c' />
          </View>
          <View style={styles.txtContainer}>
            <TextInput
              style={styles.input}
              placeholder='Numero de la Tarjeta'
              value={this.state.numeroTarjeta}
              onChangeText={(numeroTarjeta) => this.setState({ numeroTarjeta })}
              />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name='calendar-o' size={25} color='#e74c3c' />
          </View>
          <View style={styles.txtContainer}>
            <TextInput
              style={styles.input}
              placeholder='MM/AAAA'
              value={this.state.fechaVencimiento}
              onChangeText={(fechaVencimiento) => this.setState({ fechaVencimiento })}
            />
          </View>
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name='unlock-alt' size={25} color='#e74c3c' />
          </View>
          <View style={styles.txtContainer}>
            <TextInput
              style={styles.input}
              placeholder='CVC'
              value={this.state.codigoSeguridad}
              onChangeText={(codigoSeguridad) => this.setState({ codigoSeguridad })}
            />
          </View>
        </View>
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
    backgroundColor: '#F3F3F3',
    paddingTop: 50,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  logo: {
    width: 350,
    height: 100
  },
  titulo: {
    margin: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginTop: 2
  },
  iconContainer: {
    alignItems: 'center',
    width: 35,
    height: 20
  },
  txtContainer: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  input: {
    height: 35,
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
