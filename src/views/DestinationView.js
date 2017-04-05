import React, { Component } from 'react'
import { StyleSheet, ListView, TouchableOpacity, Text } from 'react-native'

import CityList from '../components/CityList'
import { getDestinos } from '../api-client'

export default class DestinosView extends Component {
  constructor (props) {
    super()

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount () {
    getDestinos(this.props.ciudadSalida)
      .then(ciudades => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(ciudades.ciudades)
        })
      })
      .catch(err => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(['row 1', 'row 2'])
        })
        console.warn(err.message)
        console.warn(err.statusCode)
      })
  }

  render () {
    return (
      <ListView dataSource={this.state.dataSource} renderRow={(ciudad) =>
        <TouchableOpacity style={styles.combo} onPress={() => this.props.handleCiudadDestino(ciudad.nombre)}>
          <CityList ciudad={ciudad} />
        </TouchableOpacity>} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  combo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 50,
    borderColor: '#F0F0F0',
    borderWidth: 1
  },
  titulo: {
    margin: 20
  },
  icon: {
    marginTop: 5,
    marginRight: 5
  }
})
