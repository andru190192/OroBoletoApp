import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  TouchableHighlight } from 'react-native'
import { setFormaPago, updateFormaPago } from '../api-client'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import payform from 'payform'
import Button from '../components/Button'
const parameters = require('../parameters')
import { Actions } from 'react-native-router-flux'
export default class PaymentFormView extends Component {
  // 4017779991118888
  // 5342102102260692
  // 4242424242424242
  // editable={false}

  constructor (props) {
    super()
    if (props.payment === undefined) {
      this.nameBotton = 'GUARDAR'
      this.state = {
        cliente: parameters.USER.cedulaRuc,
        tipo: 'SE',
        nombreTarjeta: `${parameters.USER.nombre} ${parameters.USER.apellido}`,
        numeroTarjeta: '',
        codigoSeguridad: '',
        fechaVencimiento: '',
        anio: '',
        mes: '',
        activo: '',
        tipoTj: 'credit-card'
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
        anio: moment(props.payment.fecha_vencimiento).format('YYYY'),
        mes: moment(props.payment.fecha_vencimiento).format('MM'),
        activo: props.payment.activo,
        id: props.payment.id,
        tipoTj: 'credit-card'
      }
    }
    this.handleAction = this.handleAction.bind(this)
  }

  _onBlurNumeroTarjeta (e) {
    if (!payform.validateCardNumber(this.state.numeroTarjeta)) {
      this.state.tipoTj = 'credit-card'
      this.setState({ isFocusNumTj: true })
    } else {
      let tipoTarjeta = payform.parseCardType(this.state.numeroTarjeta)
      this.state.tipoTj = 'credit-card'
      if (tipoTarjeta === 'visa') {
        this.state.tipoTj = 'cc-visa'
      } if (tipoTarjeta === 'mastercard') {
        this.state.tipoTj = 'cc-mastercard'
      } else if (tipoTarjeta === 'diners club') {
        this.state.tipoTj = 'cc-diners-club'
      } else if (tipoTarjeta === 'discover') {
        this.state.tipoTj = 'cc-discover'
      } if (tipoTarjeta === 'american express') {
        this.state.tipoTj = 'cc-amex'
      }
      this.setState({ isFocusNumTj: false })
    }
  }

  _onBlurFechaVencimiento (e) {
    if (this.state.mes.length === 2 && this.state.anio.length === 4) {
      if (!payform.validateCardExpiry(this.state.mes, this.state.anio)) {
        this.setState({ isFocusFecha: true })
      } else {
        this.setState({ isFocusFecha: false })
      }
    }
  }

  _onBlurCVC (e) {
    if (this.state.tipoTj === 'amex') {
      this.validarCVC = payform.validateCardCVC(this.state.codigoSeguridad, 'amex')
    } else {
      this.validarCVC = payform.validateCardCVC(this.state.codigoSeguridad)
    }
    if (!this.validarCVC) {
      this.setState({ isFocused: true })
    } else {
      this.setState({ isFocused: false })
    }
  }

  mensajeAlerta (titulo, mensaje) {
    Alert.alert(
      titulo,
      mensaje,
      [
        {text: 'OK', onPress: () => { this.state.datosCorrecto && Actions.pop() } }
      ],
      { cancelable: false }
    )
  }

  handleAction () {
    this.state.activo = 'TRUE'
    this.state.fechaVencimiento = `${this.state.anio}-${this.state.mes}`
    this.setState({ datosCorrecto: true })
    if (!payform.validateCardNumber(this.state.numeroTarjeta)) {
      this.mensajeAlerta('Error en los datos', 'Numero de Tarjeta Incorrecto')
      this.setState({ datosCorrecto: false })
    } else if (!payform.validateCardExpiry(this.state.mes, this.state.anio)) {
      this.mensajeAlerta('Error en los datos', 'Fecha Incorrecta')
      this.setState({ datosCorrecto: false })
    } else {
      if (payform.parseCardType(this.state.numeroTarjeta) === 'amex') {
        this.validarCVC = payform.validateCardCVC(this.state.codigoSeguridad, 'amex')
      } else {
        this.validarCVC = payform.validateCardCVC(this.state.codigoSeguridad)
      }
      if (!this.validarCVC) {
        this.mensajeAlerta('Error en los datos', 'CVC Incorrecto')
        this.setState({ datosCorrecto: false })
      } else {
        if (this.nameBotton === 'GUARDAR') {
          setFormaPago(this.state)
            .then(data => {
              this.mensajeAlerta('Datos de la tarjeta', 'Guardados Correctamente')
            })
            .catch(err => {
              console.warn(`${err}`)
            })
        } else {
          updateFormaPago(this.state)
            .then(data => {
              this.mensajeAlerta('Datos de la tarjeta', 'Se Modifico Correctamente')
            })
            .catch(err => {
              console.warn(`${err}`)
            })
        }
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
            DATOS
        </Text>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name='address-card-o' size={25} color='#F49A00' />
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
            <Icon style={styles.icon} name={this.state.tipoTj} size={25} color='#F49A00' />
          </View>
          <View style={styles.txtContainer}>
            <TextInput
              style={[ styles.input, this.state.isFocusNumTj && styles.focusedError
              ]}
              onBlur={this._onBlurNumeroTarjeta.bind(this)}
              placeholder='Numero de la Tarjeta'
              value={this.state.numeroTarjeta}
              maxLength={16}
              keyboardType={'numeric'}
              onChangeText={(numeroTarjeta) => this.setState({ numeroTarjeta })}
              />

          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name='calendar-o' size={25} color='#F49A00' />
          </View>
          <View style={styles.txtContainer}>
            <TextInput
              style={[ styles.input, this.state.isFocusFecha && styles.focusedError
              ]}
              onBlur={this._onBlurFechaVencimiento.bind(this)}
              placeholder='AAAA'
              value={this.state.anio}
              maxLength={4}
              keyboardType={'numeric'}
              onChangeText={(anio) => this.setState({ anio })}
            />

          </View>

          <Text style={styles.etiqueta}>/</Text>

          <View style={styles.txtContainer}>
            <TextInput
              style={[ styles.input, this.state.isFocusFecha && styles.focusedError
              ]}
              onBlur={this._onBlurFechaVencimiento.bind(this)}
              placeholder='MM'
              value={this.state.mes}
              maxLength={2}
              keyboardType={'numeric'}
              onChangeText={(mes) => this.setState({ mes })}
          />
          </View>
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name='unlock-alt' size={25} color='#F49A00' />
          </View>
          <View style={styles.txtContainer}>
            <TextInput
              style={[ styles.input, this.state.isFocused && styles.focusedError
              ]}
              onBlur={this._onBlurCVC.bind(this)}
              placeholder='CVC'
              maxLength={4}
              keyboardType={'numeric'}
              value={this.state.codigoSeguridad}
              onChangeText={(codigoSeguridad) => this.setState({ codigoSeguridad })}
            />
          </View>
        </View>
        <Button text={this.nameBotton} onPress={this.handleAction} primary icon='check' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
  default: {
    borderColor: 'gray',
    borderBottomWidth: 2
  },
  focusedError: {
    borderColor: 'red'
  },
  focused: {
    borderColor: 'blue'
  },
  logo: {
    width: 350,
    height: 100
  },
  titulo: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#1E70B8'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginTop: 2
  },
  iconContainer: {
    alignItems: 'center',
    paddingHorizontal: 5
  },
  icon: {
    marginTop: 5,
    marginRight: 5
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

  buttonAction: {
    backgroundColor: 'skyblue',
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    height: 40,
    width: 250,
    alignSelf: 'center'

  },
  textButtom: {
    textAlign: 'center',
    color: 'white'
  },
  etiqueta: {
    margin: 5,
    fontSize: 20
  }
})
