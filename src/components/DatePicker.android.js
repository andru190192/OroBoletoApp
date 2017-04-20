import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  DatePickerAndroid,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

export default class DatePicker extends Component {
  constructor (props) {
    super()
    this.state = {
      simpleDate: new Date(moment().format('MM/DD/YYYY')),
      simpleText: moment().format('DD/MM/YYYY')
    }
  }

  showPicker = async (stateKey, options) => {
    try {
      var newState = {}
      const {action, year, month, day} = await DatePickerAndroid.open(options)
      var date = new Date(year, month, day)
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Date'] = date
      } else {
        newState[stateKey + 'Text'] = moment(`${day}/${month + 1}/${year}`, 'DD/MM/yyyy').format('DD/MM/YYYY')
        newState[stateKey + 'Date'] = date
      }
      this.setState(newState)
      this.props.onHandleFecha(this.state.simpleText)
    } catch ({code, message}) {
      Actions.pop()
      Alert.alert('OroTicket', message)
    }
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
        <View style={styles.combo}>
          <View style={styles.seleccion}>
            <Text style={styles.label}>{this.state.simpleText}</Text>
          </View>
          <Icon style={styles.icon} name='calendar' size={32} color='#e74c3c' />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  seleccion: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20
  },
  combo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 50,
    marginHorizontal: 10,
    borderColor: '#F0F0F0',
    borderWidth: 1

  },
  icon: {
    marginTop: 5,
    marginRight: 5
  }
})
