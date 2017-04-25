import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Button extends Component {
  render () {
    if (this.props.icon && this.props.text) {
      return (
        <TouchableOpacity style={[{backgroundColor: this.props.primary ? '#F49A00' : '#1E70B8'}, styles.button]} onPress={() => this.props.onPress()}>
          <Icon style={styles.icon} name={this.props.icon ? this.props.icon : 'search'} size={16} color='#FFF' />
          <Text style={styles.textButton}>{this.props.text}</Text>
          <Icon name={this.props.icon ? this.props.icon : 'search'} size={16} color={this.props.primary ? '#F49A00' : '#1E70B8'} />
        </TouchableOpacity>
      )
    } else if (this.props.text) {
      return (
        <TouchableOpacity style={[{backgroundColor: this.props.primary ? '#F49A00' : '#1E70B8'}, styles.button]} onPress={() => this.props.onPress()}>
          <Text style={styles.textButton}>{this.props.text}</Text>
        </TouchableOpacity>
      )
    } else if (this.props.icon) {
      return (
        <TouchableOpacity style={styles.buttonIcon} onPress={() => this.props.onPress()}>
          <Icon name={this.props.icon ? this.props.icon : 'search'} size={32} color={this.props.primary ? '#F49A00' : '#1E70B8'} />
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    height: 40,
    width: 150,
    marginVertical: 10,
    marginHorizontal: 5
  },
  buttonIcon: {
    alignSelf: 'center'
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    height: 20
  },
  icon: {
    height: 20,
    paddingLeft: 5
  }
})
