import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  DatePickerAndroid,
  TouchableWithoutFeedback
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class HomeView extends Component {

  state = {
    simpleDate: new Date(),
    simpleText: 'Escoje una fecha'
  }

  showPicker = async (stateKey, options) => {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  enviarOrigen () {
    const destino = this.props.ciudadDestino
    Actions.salidas({destino})
  }

  enviarDestino () {
    const salida = this.props.ciudadSalida
    Actions.destinos({salida})
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>BUSCA TU BOLETO</Text>
        <TouchableOpacity style={styles.combo} onPress={() => this.enviarOrigen()}>
          <View style={styles.seleccion}>
            <Text style={styles.label}>Escoje tu salida</Text>
            <Text style={styles.element}>{this.props.ciudadSalida}</Text>
          </View>
          <Icon style={styles.icon} name='map-marker' size={32} color='#e74c3c' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.combo} onPress={() => this.enviarDestino()}>
          <View style={styles.seleccion}>
            <Text style={styles.label}>Escoje tu Destino</Text>
            <Text style={styles.element}>{this.props.ciudadDestino}</Text>
          </View>
          <Icon style={styles.icon} name='map-marker' size={32} color='#e74c3c' />
        </TouchableOpacity>

        <TouchableWithoutFeedback style={styles.datePicker}
          onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
          <View>
            <Text style={styles.text}>{this.state.simpleText}</Text>
            <Icon style={styles.icon} name='map-marker' size={32} color='#e74c3c' />
          </View>
        </TouchableWithoutFeedback>
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
    borderWidth: 1,

  },
  icon: {
    marginTop: 5,
    marginRight: 5
  },
  titulo: {
    margin: 20
  }
})