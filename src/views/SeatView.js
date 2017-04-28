import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, Image, Alert, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getTurnoVehiculo } from '../api-client'
import Vehicle from '../components/Vehicle'
import Button from '../components/Button'

export default class SeatView extends Component {
  constructor (props) {
    super()
    this.state = {
      vehiculoAsientos: {
        numero_asientos: 0,
        asientos_vendidos: []
      },
      numeroSeleccionado: null,
      nombreSeleccionado: null
    }
    this.handleSeleccion = this.handleSeleccion.bind(this)
    this.handleContinuar = this.handleContinuar.bind(this)
  }

  componentWillMount () {
    getTurnoVehiculo(this.props.turno, this.props.fecha)
      .then(turnoVehiculo => this.setState({ vehiculoAsientos: turnoVehiculo.vehiculoAsientos }))
      .catch(err => Alert.alert('OroTicket', err.message))
  }

  handleSeleccion (numeroSeleccionado, nombreSeleccionado) {
    this.setState({ numeroSeleccionado, nombreSeleccionado })
  }

  handleContinuar () {
    if (this.state.numeroSeleccionado === null) {
      Alert.alert('OroTicket', 'Escoja un asiento')
    } else {
      Actions.preInvoice({
        ciudadSalida: this.props.ciudadSalida,
        ciudadDestino: this.props.ciudadDestino,
        cooperativa: this.props.cooperativa,
        logo: this.props.logo,
        fecha: this.props.fecha,
        hora: this.props.hora,
        valor: this.props.valor,
        asientoNumero: this.state.numeroSeleccionado,
        asientoNombre: this.state.nombreSeleccionado })
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.grupoHorizontal}>
            <View style={{ alignItems: 'center' }}>
              <Icon style={styles.icon} name='square' size={20} color='#1E70B8' />
              <Text>Libre</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon style={styles.icon} name='square' size={20} color='#F49A00' />
              <Text>Seleccionado</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon style={styles.icon} name='square' size={20} color='#808080' />
              <Text>Ocupado</Text>
            </View>
          </View>
          <Image source={require('../static/images/bus.png')} style={styles.bus} />
          <Vehicle
            numeroAsientos={this.state.vehiculoAsientos.numero_asientos}
            asientosVendidos={this.state.vehiculoAsientos.asientos_vendidos}
            onHandleSeleccion={this.handleSeleccion}
          />
          <View style={styles.grupoHorizontal}>
            <Button
              primary
              text='Continuar'
              icon='check'
              onPress={this.handleContinuar} />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 15 : 0
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
