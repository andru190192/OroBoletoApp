import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  TouchableHighlight } from 'react-native'
import { setFormaPago } from '../api-client'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import payform from 'payform'
const parameters = require('../parameters')
export default class PaymentFormView extends Component {
  // 4017779991118888
  // 5342102102260692
  // 4242 4242 4242 4242
  // editable={false}

  constructor (props) {
    super()
    if (props.payment === undefined) {
      this.nameBotton = 'GUARDAR'
      this.state = {
        cliente: parameters.USER.cedulaRuc,
        tipo: 'SE',
        nombreTarjeta: '',
        numeroTarjeta: '',
        codigoSeguridad: '',
        fechaVencimiento: '',
        activo: '',
        tipoTj: 'credit-card',
        isFocused: false

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
        id: props.payment.id,
        tipoTj: 'credit-card'
      }
    }
  }

  _onBlurNumeroTarjeta (e) {
    if (!payform.validateCardNumber(this.state.numeroTarjeta)) {
      console.warn('Numero de tj incorrecto')
      this.state.tipoTj = 'credit-card'
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
      this.setState({ isFocused: false })
    }
  }
  _onFocusNumeroTarjeta (e) {
    this.setState({ isFocused: true })
    console.warn('_onFocus')
  }

  _onBlurFechaVencimiento (e) {
    if (!payform.validateCardExpiry(this.state.fechaVencimiento.substring(5, 7), this.state.fechaVencimiento.substring(0, 4))) {
      console.warn('error fecha')
    } else {
      console.warn('fecha correcta')
      this.setState({ isFocused: false })
    }
  }
  _onFocusFechaVencimiento (e) {
    this.setState({ isFocused: true })
    console.warn('_onFocus')
  }
  _onBlurCVC (e) {
    if (this.state.tipoTj === 'amex') {
      this.validarCVC = payform.validateCardCVC(this.state.codigoSeguridad, 'amex')
    } else {
      this.validarCVC = payform.validateCardCVC(this.state.codigoSeguridad)
    }
    if (!this.validarCVC) {
      console.warn('error en el CVC')
    } else {
      console.warn('Datos Correctos')
      this.setState({ isFocused: false })
    }
  }

  _onFocusCVC (e) {
    this.setState({ isFocused: true })
    console.warn('_onFocus')
  }
  mensajeAlerta (titulo, mensaje) {
    Alert.alert(
      titulo,
      mensaje,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ],
      { cancelable: false }
    )
  }

  handleAction () {
    this.state.activo = 'TRUE'

    if (!payform.validateCardNumber(this.state.numeroTarjeta)) {
      this.mensajeAlerta('Error en los datos', 'Numero de Tarjeta Incorrecto')
    } else if (!payform.validateCardExpiry(this.state.fechaVencimiento.substring(5, 7), this.state.fechaVencimiento.substring(0, 4))) {
      this.mensajeAlerta('Error en los datos', 'Fecha Incorrecta')
    } else {
      if (payform.parseCardType(this.state.numeroTarjeta) === 'amex') {
        this.validarCVC = payform.validateCardCVC(this.state.codigoSeguridad, 'amex')
      } else {
        this.validarCVC = payform.validateCardCVC(this.state.codigoSeguridad)
      }
      if (!this.validarCVC) {
        this.mensajeAlerta('Error en los datos', 'CVC Incorrecto')
      } else {
        setFormaPago(this.state)
          .then(data => {
            this.mensajeAlerta('Datos de la tarjeta', 'Guardados Correctamente')
          })
          .catch(err => {
            console.warn(`${err}`)
          })
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.titulo}>
            DATOS DE TARJETA (CREDITO/DEBITO)
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
            <Icon style={styles.icon} name={this.state.tipoTj} size={25} color='#e74c3c' />
          </View>
          <View style={styles.txtContainer}>
            <TextInput
              style={[ styles.input, this.state.isFocused && styles.focused
              ]}
              onBlur={this._onBlurNumeroTarjeta.bind(this)}
              onFocus={this._onFocusNumeroTarjeta.bind(this)}
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
              style={[ styles.input, this.state.isFocused && styles.focused
              ]}
              onBlur={this._onBlurFechaVencimiento.bind(this)}
              onFocus={this._onFocusFechaVencimiento.bind(this)}
              placeholder='AAAA-MM'
              value={this.state.fechaVencimiento}
              onChangeText={(fechaVencimiento) => this.setState({ fechaVencimiento })}
            />
          </View>
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name='unlock-alt' size={25} color='#e74c3c' />
          </View>
          <View style={styles.txtContainer}>
            <TextInput
              style={[ styles.input, this.state.isFocused && styles.focused
              ]}
              onBlur={this._onBlurCVC.bind(this)}
              onFocus={this._onFocusCVC.bind(this)}
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
  default: {
    borderColor: 'gray',
    borderBottomWidth: 2
  },
  focused: {
    borderColor: 'blue'
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
    width: 250,
    alignSelf: 'center'

  },
  textButtom: {
    textAlign: 'center',
    color: 'white'
  }
})
