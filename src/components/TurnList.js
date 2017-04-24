import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const parameters = require('../parameters')

export default class TurnList extends Component {
  render () {
    return (
      <View style={styles.seleccion}>
        <View style={styles.grupoVertical}>
          <Text style={styles.titulo}>{this.props.turno.cooperativa}</Text>
          <Image source={{uri: `${parameters.URL}${this.props.turno.url_logo}`}} style={styles.logo} />
        </View>
        <View style={styles.informacion}>
          <View style={styles.grupoHorizontalPrecio}>
            <Icon style={styles.icon} name='usd' size={14} color='#F49A00' />
            <Text style={styles.precio}>{this.props.turno.valor}</Text>
          </View>
          <View style={styles.grupoHorizontal}>
            <Icon name='clock-o' size={20} color='#F49A00' />
            <Text>{this.props.turno.hora_salida}</Text>
            <Text>-</Text>
            <Text>{this.props.turno.hora_llegada}</Text>
          </View>
          <View style={styles.grupoHorizontal}>
            <Text>{this.props.turno.asientos} Disponibles</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  seleccion: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logo: {
    width: 150,
    height: 50
  },
  grupoVertical: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    flex: 1
  },
  informacion: {
    marginTop: 5,
    marginBottom: 5,
    flex: 1
  },
  grupoHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  grupoHorizontalPrecio: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titulo: {
    // color: '#F49A00',
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5
  },
  precio: {
    fontSize: 18
  },
  icon: {
    paddingTop: 6,
    marginRight: 2
  }
})
