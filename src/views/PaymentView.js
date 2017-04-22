import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { getFormasPagos } from '../api-client'
import PaymentList from '../components/PaymentList'
const parameters = require('../parameters')

export default class PaymentView extends Component {
  constructor (props) {
    super()
    this.state = {
      payments: [],
      mensaje: null
    }
  }

  componentDidMount () {
    getFormasPagos(parameters.USER.cedulaRuc)
    .then(data => {
      this.setState({ payments: data.formasPago })
    })
    .catch(() => {
      this.setState({mensaje: 'No tiene Tarjetas Registrada'})
    })
  }

  _renderMensajeLista () {
    if (this.state.mensaje !== null) {
      return (<Text style={styles.mensaje}>{this.state.mensaje}</Text>)
    }
  }

  render () {
    return (
      <View>
        <PaymentList payments={this.state.payments} />
        <View style={styles.containerInterno}>
          <Text>{this._renderMensajeLista()}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3'

  },
  containerInterno: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  mensaje: {
    margin: 30,
    alignSelf: 'center'
  }
})
