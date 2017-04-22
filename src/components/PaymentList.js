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
 // /// se llama cada ves que se cambia las propiedades
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
        <Icon style={styles.icon} name='plus-square' size={32} color='#FFF' />
        <Text style={styles.titulo}>LISTA DE TARJETA</Text>
        <TouchableHighlight
          style={styles.buttonAgregar}
          onPress={() => Actions.PaymentFormView()}>
          <Icon style={styles.icon} name='plus-square' size={32} color='skyblue' />
        </TouchableHighlight>
      </View>
    )
  }

  handlePayment (payment) {
    Actions.PaymentFormView({payment})
  }

  handleLongPress () {
    Alert.alert('OroTicket', 'Desea eliminar')
  }

  render () {
    return (
      <ListView enableEmptySections dataSource={this.state.dataSource} renderRow={(payment) =>
        <TouchableOpacity onLongPress={() => this.handleLongPress()} onPress={() => this.handlePayment(payment)}>
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
  buttonAgregar: {
    alignSelf: 'center',
    marginBottom: 5
  },
  icon: {
    marginLeft: 10,
    marginBottom: 4
  },
  titulo: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
