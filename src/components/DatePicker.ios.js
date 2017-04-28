import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  DatePickerIOS
} from 'react-native'

export default class DatePicker extends Component {
  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
  }
  state = {
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours
  }
  onDateChange = (date) => {
    this.setState({date})
    this.props.onHandleFecha(date)
  }

  render () {
    return (
      <View style={styles.contenedor}>
        <View style={styles.calendario}>
          <DatePickerIOS
            date={this.state.date}
            mode='date'
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
          />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 200,
    marginHorizontal: 10,
    borderColor: '#F0F0F0',
    borderWidth: 1
  },
  calendario: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})
