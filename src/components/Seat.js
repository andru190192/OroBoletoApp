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
  }

  componentWillMount () {
    this.state = {
      render: this.props.render,
      numero: this.props.numero,
      seleccionado: this.props.seleccionado,
      ocupado: this.props.ocupado
    }
  }

  handleSeleccion () {
    if (this.state.seleccionado) {
      this.setState({
        seleccionado: false
      })
      this.props.onHandleSeleccion('')
    } else {
      this.setState({
        seleccionado: true
      })
      this.props.onHandleSeleccion(this.state.numero)
    }
  }

  render () {
    asiento = this.state.render ? <TouchableOpacity onPress={() => this.handleSeleccion()} disabled={this.state.ocupado}>
      <Text style={styles.asiento}>{this.state.ocupado ? '' : this.state.numero}</Text>
      <Icon name={this.state.seleccionado ? 'square' : this.state.ocupado ? 'minus-square-o' : 'square-o'} size={48} color={this.state.seleccionado ? '#FEE800' : this.state.ocupado ? '#808080' : '#A4C739'} />
    </TouchableOpacity> : <TouchableOpacity disabled>
      <View style={{ flexDirection: 'row', opacity: 0 }}>
        <Text style={styles.asiento}>{this.state.numero}</Text>
        <Icon name='square-o' size={48} color='#A4C739' />
      </View>
    </TouchableOpacity>

    return (
          asiento
    )
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
