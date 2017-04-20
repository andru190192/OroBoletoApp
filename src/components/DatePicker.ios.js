import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  DatePickerIOS
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

export default class DatePicker extends Component {
  constructor (props) {
    super()
  }

  render () {
    return (
      <View>
        <Text>DatePickerIOS</Text>

      </View>
    )
  }
}
