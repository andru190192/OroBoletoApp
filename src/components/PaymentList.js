import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import PaymentBox from './PaymentBox'

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
      //console.warn('cambio la lista');
      this.updateDataSource(newProps.payments)
    }
  }

  updateDataSource = data => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    })
  }

  handlePress (payment) {
  //  console.warn( 'paymentlll',payment )
    Actions.PaymentFormView({payment})
  }


  render() {
    return (
      <ListView
         enableEmptySections = {true}
         dataSource={this.state.dataSource}
         renderRow={(payment) => {
           return (
              <TouchableOpacity
              onPress={() => this.handlePress(payment)}>
                <PaymentBox payment={payment}/>
              </TouchableOpacity>
            )
         }}
       />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 50

  }
})
