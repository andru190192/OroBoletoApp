import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, TouchableWithoutFeedback, DatePickerAndroid, Platform } from 'react-native'

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

export default class HomeView extends Component {
  showPicker = async (stateKey, options) => {
    try {
      var newState = {}
      const {action, year, month, day} = await DatePickerAndroid.open(options)
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed'
      } else {
        var date = new Date(year, month, day)
        newState[stateKey + 'Text'] = moment(`${day}/${month + 1}/${year}`, 'DD/MM/yyyy').format('DD/MM/YYYY')
        newState[stateKey + 'Date'] = date
      }
      this.setState(newState)
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message)
    }
  }

  constructor (props) {
    super()

    this.state = {
      ciudadSalida: '',
      ciudadDestino: '',
      simpleDate: new Date(moment().format('DD/MM/YYYY')),
      simpleText: moment().format('DD/MM/YYYY')
    }
    this.handleCiudadSalida = this.handleCiudadSalida.bind(this)
    this.handleCiudadDestino = this.handleCiudadDestino.bind(this)
  }

  handleCiudadSalida (ciudadSalida) {
    this.setState({ ciudadSalida, ciudadDestino: '' })
    Actions.pop()
  }

  handleCiudadDestino (ciudadDestino) {
    this.setState({ ciudadDestino })
    Actions.pop()
  }

  render () {
    const isAndroid = Platform.OS === 'android'
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>BUSCA TU BOLETO</Text>
        <TouchableOpacity style={styles.combo} onPress={() => Actions.salidas({ handleCiudadSalida: this.handleCiudadSalida })}>
          <View style={styles.seleccion}>
            <Text style={styles.label}>Escoje tu salida</Text>
            <Text style={styles.element}>{this.state.ciudadSalida}</Text>
          </View>
          <Icon style={styles.icon} name='map-marker' size={32} color='#e74c3c' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.combo} onPress={() => Actions.destinos({ ciudadSalida: this.state.ciudadSalida, handleCiudadDestino: this.handleCiudadDestino })}>
          <View style={styles.seleccion}>
            <Text style={styles.label}>Escoje tu Destino</Text>
            <Text style={styles.element}>{this.state.ciudadDestino}</Text>
          </View>
          <Icon style={styles.icon} name='map-marker' size={32} color='#e74c3c' />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
          <View style={styles.combo}>
            <View style={styles.seleccion}>
              <Text style={styles.label}>{this.state.simpleText}</Text>
            </View>
            <Icon style={styles.icon} name='calendar' size={32} color='#e74c3c' />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity style={styles.btnBuscar} onPress={() => console.warn('busqueda', isAndroid)} title='Buscar'>
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
    margin: 20
  },
  btnBuscar: {
    height: 50,
    width: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#e74c3c'
  }
})
