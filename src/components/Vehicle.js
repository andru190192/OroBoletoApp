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

export default class Vehicle extends Component {
  constructor (props) {
    super()
    this.state = {
      asientosVendidos: 0,
      numeroAsiento: null,
      nombreAsiento: null
    }
    this.handleSeleccion = this.handleSeleccion.bind(this)
  }

  componentWillReceiveProps (next_props) {
    this.setState({
      asientosVendidos: next_props.asientosVendidos
    })
  }

  handleSeleccion (numeroAsiento, nombreAsiento) {
    this.setState({ numeroAsiento, nombreAsiento })
  }

  handleContinuar () {
    if (this.state.numeroAsiento === null) {
      Alert.alert('OroTicket', 'Escoja un asiento')
    } else {
      Actions.preInvoice({asiento: this.state.nombreAsiento})
    }
  }

  designBus () {
    let asientos = []
    for (var i = 0; i < this.props.numeroAsientos; i++) {
      asientos.push(
        <View style={styles.grupoHorizontal}>
          <Seat numero='1A' />
          <Seat render numero='1B' ocupado />
          <Seat render numero='1C' onHandleSeleccion={this.handleSeleccion} />
          <Seat numero='1D' onHandleSeleccion={this.handleSeleccion} />
        </View>)
    }
    return asientos
  }

  designBuseta () {
    let asientos = []
    let numero = 1
    for (var i = 1; i <= 6; i++) {
      asientos.push(
        <View style={styles.grupoHorizontal} key={i}>
          <Seat
            numero={i === 1 ? null : numero++}
            nombre={`${i}A`}
            render={i === 1 ? false : true}
            seleccionado={this.state.numeroAsiento}
            vendidos={this.state.asientosVendidos}
            onHandleSeleccion={this.handleSeleccion} />
          <Seat
            numero={numero++}
            nombre={`${i}B`}
            render
            seleccionado={this.state.numeroAsiento}
            vendidos={this.state.asientosVendidos}
            onHandleSeleccion={this.handleSeleccion} />
          <Seat
            numero={i === 3 ? null : numero++}
            nombre={`${i}C`}
            render={i === 3 ? false : true}
            seleccionado={this.state.numeroAsiento}
            vendidos={this.state.asientosVendidos}
            onHandleSeleccion={this.handleSeleccion} />
          <Seat
            numero={i === 6 ? numero++ : null}
            nombre={`${i}D`}
            render={i === 6 ? true : false}
            seleccionado={this.state.numeroAsiento}
            vendidos={this.state.asientosVendidos}
            onHandleSeleccion={this.handleSeleccion} />
        </View>)
    }

    return asientos
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.numeroAsientos === 17 ? this.designBuseta() : this.designBus()}
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
