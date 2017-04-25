import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

let asiento

export default class Seat extends Component {
  constructor (props) {
    super()

    console.log(prop.numero)
    console.log(prop.nombre)
    console.log(prop.ocupados)

    this.state = {
      seleccionado: false,
      ocupado: true
    }
    }

  handleSeleccion () {
    this.setState({
      seleccionado: !this.state.seleccionado
    })
    this.props.onHandleSeleccion(this.props.numero)
  }

  render () {
    if (this.props.render) {
      return (
        <TouchableOpacity onPress={() => this.handleSeleccion()} disabled={this.state.ocupado}>
          <Text style={styles.asiento}>{this.state.ocupado ? '' : this.props.nombre}</Text>
          <Icon name={this.state.seleccionado ? 'square' : this.state.ocupado ? 'minus-square-o' : 'square-o'} size={48} color={this.state.seleccionado ? '#FEE800' : this.state.ocupado ? '#808080' : '#A4C739'} />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity disabled>
          <View style={{ flexDirection: 'row', opacity: 0 }}>
            <Text style={styles.asiento}>{this.props.nombre}</Text>
            <Icon name='square-o' size={48} color='#A4C739' />
          </View>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  asiento: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: 7,
    marginTop: 7,
    fontSize: 20,
    color: '#A4C739'
  }
})
