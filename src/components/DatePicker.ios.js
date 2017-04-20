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

  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60}

  state = {
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours}

  onDateChange = (date) => {
    this.setState({date: date})
  }

  onTimezoneChange = (event) => {
    var offset = parseInt(event.nativeEvent.text, 10)
    if (isNaN(offset)) {
      return
    }
    this.setState({timeZoneOffsetInHours: offset})
  }

  render () {
    return (
      <View>
        <Text>DatePickerIOS</Text>
        <DatePickerIOS
          date={this.state.date}
          mode='date'
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
          />
      </View>
    )
  }
}
