import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getTurnoVehiculo } from '../api-client'
import Vehicle from '../components/Vehicle'

export default class SeatView extends Component {
  constructor (props) {
    super()
    this.state = {
      vehiculoAsientos: {
        numero_asientos: 0,
        asientos_vendidos: []
      }
    }
  }

  componentWillMount () {
    getTurnoVehiculo(this.props.turno, this.props.fecha)
      .then(turnoVehiculo => this.setState({ vehiculoAsientos: turnoVehiculo.vehiculoAsientos }))
      .catch(err => Alert.alert('OroTicket', err.message))
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.grupoHorizontal}>
            <View style={{ alignItems: 'center' }}>
              <Icon style={styles.icon} name='square-o' size={20} color='#A4C739' />
              <Text>Libre</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon style={styles.icon} name='square' size={20} color='#FEE800' />
              <Text>Seleccionado</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon style={styles.icon} name='minus-square-o' size={20} color='#808080' />
              <Text>Ocupado</Text>
            </View>
          </View>
          <Image source={require('../static/images/bus.png')} style={styles.bus} />
          <Vehicle
            numeroAsientos={this.state.vehiculoAsientos.numero_asientos}
            asientosVendidos={this.state.vehiculoAsientos.asientos_vendidos}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  grupoHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1
  },
  grupoVertical: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1
  },
  bus: {
    width: 350,
    height: 102,
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 20
  },
  asiento: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: 12,
    marginTop: 7,
    fontSize: 20
  }
})
