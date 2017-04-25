import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Seat extends Component {
  constructor (props) {
    super()

    this.state = {
      seleccionado: false,
      ocupado: props.vendidos.includes(props.numero)
    }
  }

  handleSeleccion () {
    this.setState({
      seleccionado: !this.state.seleccionado
    })
    this.props.onHandleSeleccion(this.props.numero, this.props.nombre)
  }

  componentWillReceiveProps (next_props) {
    console.log('numero: ' + this.props.numero + ' selec: ' + next_props.seleccionado)
    this.setState({
      seleccionado: this.props.numero === next_props.seleccionado ? true : false
    })
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
