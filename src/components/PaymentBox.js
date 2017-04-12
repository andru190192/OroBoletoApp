import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
export default class PaymentBox extends Component {
  render () {
    return (
      <View style={styles.paymentBox}>
        <View style={styles.row}>
          <Icon style={styles.icon} name='user-o' size={25} color='#e74c3c' />
          <View style={styles.grupoVertical}>
            <Text style={styles.detalle}>{this.props.payment.nombre_tarjeta}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Icon style={styles.icon} name='credit-card' size={25} color='#e74c3c' />
          <View style={styles.grupoVertical}>
            <Text style={styles.detalle}>{this.props.payment.numero_tarjeta}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Icon style={styles.icon} name='calendar-o' size={25} color='#e74c3c' />
          <View style={styles.grupoVertical}>
            <Text style={styles.detalle}>{moment(this.props.payment.fecha_vencimiento).format('MM/YYYY')}</Text>
          </View>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  paymentBox: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'flex-start',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2,
    marginTop: 5,
    paddingLeft: 10
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5
  },
  icon: {
    marginTop: 5,
    marginRight: 5
  },
  iconContainer: {
    backgroundColor: 'black'
  },
  txtContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    backgroundColor: 'blue'
  },
  grupoVertical: {
    flexDirection: 'column',
    justifyContent: 'center'
  }

})
