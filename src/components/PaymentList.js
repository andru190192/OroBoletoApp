import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import PaymentBox from './PaymentBox'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../components/Button'
import { updateFormaPago } from '../api-client'

export default class PaymentList extends Component {
  constructor (props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(props.payments)
    }
  }
  componentDidMount () {
    this.updateDataSource(this.props.payments)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.payments !== this.props.payments) {
      this.updateDataSource(newProps.payments)
    }
  }

  updateDataSource = data => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    })
  }
  renderSectionHeader () {
    return (
      <View style={styles.grupoHorizontal}>
        <Icon style={styles.icon} name='plus-square' size={32} color='#F3F3F3' />
        <Text style={styles.titulo}>METODOS DE PAGO</Text>
        <Button
          primary
          icon='plus-square'
          onPress={() => Actions.PaymentFormView()}
        />
      </View>
    )
  }

  handlePayment (payment) {
    Actions.PaymentFormView({payment})
  }

  handleLongPress (payment) {
    Alert.alert(
      'OroTicket',
      'Desea eliminar',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => { this.anularFormaPago(payment) } }
      ],
      { cancelable: false }
    )
  }
  anularFormaPago (payment) {
    payment.activo = 'false'
    updateFormaPago(payment)
      .then(data => {
        console.log();
      })
      .catch(err => {
        console.warn(`${err}`)
      })
  }

  render () {
    return (
      <ListView enableEmptySections dataSource={this.state.dataSource} renderRow={(payment) =>
        <TouchableOpacity onLongPress={() => this.handleLongPress(payment)} onPress={() => this.handlePayment(payment)}>
          <PaymentBox payment={payment} />
        </TouchableOpacity>} renderSectionHeader={() => this.renderSectionHeader()} />
    )
  }
}

const styles = StyleSheet.create({
  grupoHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1
  },
  titulo: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E70B8'
  }
})
