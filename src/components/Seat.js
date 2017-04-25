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
      ocupado: props.vendidos.includes(props.numero),
      nombre: props.nombre ? props.nombre : props.numero
    }
  }

  handleSeleccion () {
    this.setState({ seleccionado: true })
    this.props.onHandleSeleccion(this.props.numero, this.state.nombre)
  }

  componentWillReceiveProps (next_props) {
    this.setState({
      seleccionado: this.props.numero === next_props.seleccionado ? true : false
    })
  }

  render () {
    if (this.props.render) {
      return (
        <TouchableOpacity
          disabled={this.state.ocupado}
          onPress={() => this.handleSeleccion()}
          >
          <Text style={styles.asiento}>{this.state.nombre}</Text>
          <Icon
            name='square'
            color={this.state.seleccionado ? '#F49A00' : this.state.ocupado ? '#808080' : '#1E70B8'}
            size={48} />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity disabled>
          <View style={{ flexDirection: 'row', opacity: 0 }}>
            <Text style={styles.asiento}>{this.state.nombre}</Text>
            <Icon name='square' size={48} color='#1E70B8' />
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
    color: '#FFF'
  }
})
