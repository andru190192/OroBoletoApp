import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
export default class PaymentBox extends Component {
  render () {
    return (
      <View style={styles.paymentBox}>
        <View>
          <Icon style={styles.icon} name='cc-visa' size={32} color='#e74c3c' />
          <Text style={styles.titulo}>Numero Tarjeta:</Text>
          <Text style={styles.titulo}>Fecha Vencimiento:</Text>
          <Text style={styles.titulo}>Tipo:</Text>
          <Text style={styles.titulo}>Activo:</Text>
        </View>
        <View style={styles.info}>
          <View>
            <Text style={styles.detalle}>{this.props.payment.nombreTarjeta}</Text>
            <Text style={styles.detalle}>{this.props.payment.numeroTarjeta}</Text>
            <Text style={styles.detalle}>{this.props.payment.fechaVencimiento}</Text>
            <Text style={styles.detalle}>{this.props.payment.tipo}</Text>
            <Text style={styles.detalle}>{this.props.payment.activo}</Text>
          </View>
        </View>
      </View>

    )
  }
}
// <Text style={styles.titulo}>Nombre Tarjeta:</Text>
// <Text style={styles.titulo}>Numero Tarjeta:</Text>
// <Text style={styles.titulo}>Fecha Vencimiento:</Text>
// <Text style={styles.titulo}>Tipo:</Text>
// <Text style={styles.titulo}>Activo:</Text>

const styles = StyleSheet.create({
  paymentBox: {
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
  },
  titulo: {
    fontSize: 15,
    marginTop: 3
  },
  detalle: {
    fontSize: 15,
    marginTop: 3
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }

})
