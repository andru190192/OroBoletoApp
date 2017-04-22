import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Platform, Alert } from 'react-native'

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import DatePicker from '../components/DatePicker'

export default class HomeView extends Component {
  constructor (props) {
    super()

    this.state = {
      ciudadSalida: '',
      ciudadDestino: '',
      simpleText: moment().format('DD/MM/YYYY')
    }

    this.handleCiudadSalida = this.handleCiudadSalida.bind(this)
    this.handleCiudadDestino = this.handleCiudadDestino.bind(this)
    this.handleFecha = this.handleFecha.bind(this)
  }

  handleFecha (fecha) {
    this.setState({ simpleText: fecha })
  }

  handleCiudadSalida (ciudadSalida) {
    this.setState({ ciudadSalida, ciudadDestino: '' })
    Actions.pop()
  }

  handleCiudadDestino (ciudadDestino) {
    this.setState({ ciudadDestino })
    Actions.pop()
  }

  handleBuscar () {
    if (this.state.ciudadSalida === '') {
      Alert.alert('OroTicket', 'Escoja una salida')
    } else if (this.state.ciudadDestino === '') {
      Alert.alert('OroTicket', 'Escoja un Destino')
    } else if (this.state.simpleText === '') {
      Alert.alert('OroTicket', 'Escoja una fecha')
    } else {
      Actions.turn({
        ciudadSalida: this.state.ciudadSalida,
        ciudadDestino: this.state.ciudadDestino,
        fecha: moment(this.state.simpleText, 'DD/MM/YYYY').format('YYYY-MM-DD')
      })
    }
  }

  render () {
    const isIos = Platform.OS === 'ios'
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>BUSCA TU BOLETO</Text>
        <TouchableOpacity style={styles.combo} onPress={() => Actions.origin({ handleCiudadSalida: this.handleCiudadSalida })}>
          <View style={styles.seleccion}>
            <Text style={styles.label}>Escoje tu salida</Text>
            <Text style={styles.element}>{this.state.ciudadSalida}</Text>
          </View>
          <Icon style={styles.icon} name='map-marker' size={32} color='#e74c3c' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.combo} onPress={() => (this.state.ciudadSalida === '') ? Alert.alert('OroTicket', 'Escoja una salida') : Actions.destination({ ciudadSalida: this.state.ciudadSalida, handleCiudadDestino: this.handleCiudadDestino })}>
          <View style={styles.seleccion}>
            <Text style={styles.label}>Escoje tu Destino</Text>
            <Text style={styles.element}>{this.state.ciudadDestino}</Text>
          </View>
          <Icon style={styles.icon} name='map-marker' size={32} color='#e74c3c' />
        </TouchableOpacity>
        <DatePicker onHandleFecha={this.handleFecha} />
        <TouchableOpacity style={styles.btnBuscar} onPress={() => this.handleBuscar()} title='Buscar'>
          <Text style={{color: '#FFFFFF'}}>Buscar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  seleccion: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20
  },
  combo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 50,
    marginHorizontal: 10,
    borderColor: '#F0F0F0',
    borderWidth: 1

  },
  icon: {
    marginTop: 5,
    marginRight: 5
  },
  titulo: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold'
  },
  btnBuscar: {
    height: 50,
    width: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#e74c3c'
  }
})
