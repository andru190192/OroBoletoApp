import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import Seat from '../components/Seat'

export default class Vehicle extends Component {
  constructor (props) {
    super()
    this.state = {
      asientosVendidos: 0,
      numeroAsiento: null
    }
    this.handleSeleccion = this.handleSeleccion.bind(this)
  }

  componentWillReceiveProps (next_props) {
    this.setState({
      asientosVendidos: next_props.asientosVendidos
    })
  }

  handleSeleccion (numeroAsiento, nombreAsiento) {
    this.setState({ numeroAsiento })
    this.props.onHandleSeleccion(numeroAsiento, nombreAsiento)
  }

  designBus () {
    let filas = Math.floor(this.props.numeroAsientos / 4)
    let asientosSobrantes = this.props.numeroAsientos % 4
    if (asientosSobrantes > 0) filas++
    let asientos = []
    let numero = 1
    for (var i = 0; i < filas; i++) {
      asientos.push(
        <View style={styles.grupoHorizontalBus} key={i}>
          <Seat
            numero={numero++}
            render
            seleccionado={this.state.numeroAsiento}
            vendidos={this.state.asientosVendidos}
            onHandleSeleccion={this.handleSeleccion} />
          <Seat
            numero={numero++}
            render={i === filas - 1 ? (asientosSobrantes >= 2 ? true : false) : true}
            seleccionado={this.state.numeroAsiento}
            vendidos={this.state.asientosVendidos}
            onHandleSeleccion={this.handleSeleccion} />
          <Seat
            numero={numero++}
            render={i === filas - 1 ? (asientosSobrantes >= 3 ? true : false) : true}
            seleccionado={this.state.numeroAsiento}
            vendidos={this.state.asientosVendidos}
            onHandleSeleccion={this.handleSeleccion} />
          <Seat
            numero={numero++}
            render={i === filas - 1 ? (asientosSobrantes >= 4 ? true : false) : true}
            seleccionado={this.state.numeroAsiento}
            vendidos={this.state.asientosVendidos}
            onHandleSeleccion={this.handleSeleccion} />
        </View>
      )
    }
    return asientos
  }

  designBuseta () {
    let asientos = []
    let numero = 1
    for (var i = 1; i <= 6; i++) {
      asientos.push(
        <View style={styles.grupoHorizontalBuseta} key={i}>
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
        </View>
      )
    }

    return asientos
  }

  render () {
    return (
      <View style={styles.container}>
        { this.props.numeroAsientos === 17 ?
            this.designBuseta()
            :
            this.designBus()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  grupoHorizontalBuseta: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1
  },
  grupoHorizontalBus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1
  }
})
