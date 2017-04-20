import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity
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
        <TouchableHighlight
          style={styles.buttonAgregar}
          onPress={() => Actions.PaymentFormView()}>
          <Text style={styles.textButtom}>AGREGAR TARJETA</Text>
        </TouchableHighlight>
      </View>
    )
  }

  handlePayment (payment) {
    Actions.PaymentFormView({payment})
  }
  render () {
    return (
      <ListView enableEmptySections={true} dataSource={this.state.dataSource}
         renderRow={(payment) => {
           return (
              <TouchableOpacity
              onPress={() => this.handlePayment(payment)}>
                <PaymentBox payment={payment}/>
              </TouchableOpacity>
            )
         }}
         renderSectionHeader={() => this.renderSectionHeader()}
       />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 50

  },
  grupoHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    paddingTop: 15,
    flex: 1
  },
  buttonAgregar: {
    backgroundColor: 'skyblue',
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    height: 40,
    width: 150,
    alignSelf: 'center'

  },
  textButtom: {
    textAlign: 'center',
    color: 'white'
  }
})
