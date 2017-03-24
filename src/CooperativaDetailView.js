import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native'

import CityList from './CityList'
import { Actions } from 'react-native-router-flux'

export default class CooperativaDetailView extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([
        'Machala', 'Guayaquil', 'Santo Domingo', 'Duran', 'Cuenca', 'Loja', 'Quito', 'Ambato'
      ])
    }
  }

  _onPressButton () {
    Actions.home()
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>LISTADO DE CIUDADES</Text>
        <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <CityList name={rowData} />} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3'
  },
  ciudad: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F0F0F0',
    borderWidth: 1,
    fontSize: 16,
    padding: 10
  },
  titulo: {
    margin: 20
  },
  icon: {
    marginTop: 5,
    marginRight: 5
  },
})
