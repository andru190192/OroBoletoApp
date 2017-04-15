import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native'
import Seat from '../components/Seat'
import { Actions } from 'react-native-router-flux'

export default class Bus extends Component {
  constructor (props) {
    super()
    this.state = {
      asientos: ''
    }
    this.handleSeleccion = this.handleSeleccion.bind(this)
  }

  handleSeleccion (asiento) {
    this.setState({
      asientos: asiento
    })
  }

  handleContinuar () {
    if (this.state.asientos === '') {
      Alert.alert('OroTicket', 'Escoja un asiento')
    } else {
      let asiento = this.state.asientos
      Actions.preInvoice({asiento})
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.grupoHorizontal}>
          <Seat render={false} numero='1A' />
          <Seat render numero='1B' ocupado />
          <Seat render numero='1C' onHandleSeleccion={this.handleSeleccion} />
          <Seat render={false} numero='1D' onHandleSeleccion={this.handleSeleccion} />
        </View>
        <View style={styles.grupoHorizontal}>
          <Seat render numero='2A' onHandleSeleccion={this.handleSeleccion} />
          <Seat render numero='2B' onHandleSeleccion={this.handleSeleccion} />
          <Seat render numero='2C' onHandleSeleccion={this.handleSeleccion} />
          <Seat render={false} numero='2D' />
        </View>
        <View style={styles.grupoHorizontal}>
          <Seat render numero='3A' onHandleSeleccion={this.handleSeleccion} />
          <Seat render numero='3B' onHandleSeleccion={this.handleSeleccion} />
          <Seat render={false} numero='3C' />
          <Seat render={false} numero='3D' />
        </View>
        <View style={styles.grupoHorizontal}>
          <Seat render numero='4A' ocupado />
          <Seat render numero='4B' ocupado />
          <Seat render numero='4C' onHandleSeleccion={this.handleSeleccion} />
          <Seat render={false} numero='4D' />
        </View>
        <View style={styles.grupoHorizontal}>
          <Seat render numero='5A' onHandleSeleccion={this.handleSeleccion} />
          <Seat render numero='5B' onHandleSeleccion={this.handleSeleccion} />
          <Seat render numero='5C' onHandleSeleccion={this.handleSeleccion} />
          <Seat render={false} numero='5D' />
        </View>
        <View style={styles.grupoHorizontal}>
          <Seat render numero='6A' onHandleSeleccion={this.handleSeleccion} />
          <Seat render numero='6B' onHandleSeleccion={this.handleSeleccion} />
          <Seat render numero='6C' onHandleSeleccion={this.handleSeleccion} />
          <Seat render numero='6D' onHandleSeleccion={this.handleSeleccion} />
        </View>
        <View style={styles.grupoHorizontal}>
          <Text style={styles.asientos}>Asiento: {this.state.asientos}</Text>
        </View>
        <View style={styles.grupoHorizontal}>
          <TouchableOpacity
            style={styles.buttonAction}
            onPress={() => this.handleContinuar()}>
            <Text style={styles.textButtom}>CONTINUAR</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  asientos: {
    marginTop: 20,
    fontSize: 20
  },
  buttonAction: {
    backgroundColor: 'skyblue',
    marginTop: 10,
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
