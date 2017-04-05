import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  TouchableOpacity
} from 'react-native'

import CityList from '../components/CityList'
import { getOrigenes } from '../api-client'

export default class SalidasView extends Component {
  constructor (props) {
    super()

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount () {
    getOrigenes()
    .then(ciudades => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(ciudades.ciudades)
      })
    })
  }

  render () {
    return (
      <ListView dataSource={this.state.dataSource} renderRow={
        (ciudad) =>
          <TouchableOpacity style={styles.combo} onPress={() => this.props.handleCiudadSalida(ciudad.nombre)}>
            <CityList ciudad={ciudad} />
          </TouchableOpacity>
        }
      />
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
