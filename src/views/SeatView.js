import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Buseta from '../components/Buseta'

export default class SeatView extends Component {
  constructor (props) {
    super()
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.grupoHorizontal}>
            <View style={{ alignItems: 'center' }}>
              <Icon style={styles.icon} name='square-o' size={20} color='#A4C739' />
              <Text>Libre</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon style={styles.icon} name='square' size={20} color='#FEE800' />
              <Text>Seleccionado</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon style={styles.icon} name='minus-square-o' size={20} color='#808080' />
              <Text>Ocupado</Text>
            </View>
          </View>
          <Image source={require('../static/images/bus.png')} style={styles.bus} />
          <Buseta disponibles={() => this.props.turno.numero_asientos} />
        </View>
      </ScrollView>
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
  asiento: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: 12,
    marginTop: 7,
    fontSize: 20
  }
})
