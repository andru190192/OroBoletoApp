import React, { Component } from 'react'
import { StyleSheet, ListView, TouchableOpacity, Text, View } from 'react-native'
import { getTurnos } from '../api-client'
import TurnList from '../components/TurnList'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'

export default class TurnView extends Component {
  constructor (props) {
    super()

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      error: ''
    }
  }

  componentDidMount () {
    getTurnos(this.props.ciudadSalida, this.props.ciudadDestino, this.props.fecha)
      .then(turnos => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(turnos.turnos)
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  }

  renderSectionHeader () {
    return (
      <View style={styles.grupoHorizontal}>
        <Icon style={styles.icon} name='map-marker' size={17} color='#e74c3c' />
        <Text>{this.props.ciudadSalida}</Text>
        <Icon style={styles.icon} name='map-marker' size={17} color='#e74c3c' />
        <Text>{this.props.ciudadDestino}</Text>
        <Icon style={styles.icon} name='calendar' size={14} color='#e74c3c' />
        <Text>{this.props.fecha}</Text>
      </View>
    )
  }

  handleTurno (turno) {
    Actions.seat({ turno })
  }

  render () {
    return (
      <View>
        <Text>{this.state.error}</Text>
        <ListView dataSource={this.state.dataSource} renderRow={(turno) =>
          <TouchableOpacity style={styles.combo} onPress={() => this.handleTurno(turno)}>
            <TurnList turno={turno} />
          </TouchableOpacity>} renderSectionHeader={() => this.renderSectionHeader()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  combo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderColor: '#F0F0F0',
    borderWidth: 1
  },
  grupoHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    paddingTop: 15,
    flex: 1
  }
})
