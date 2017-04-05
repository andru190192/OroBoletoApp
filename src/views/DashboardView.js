import React, { Component } from 'react'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import SearchView from './SearchView'
import InvoiceView from './InvoiceView'
import PaymentView from './PaymentView'
import PerfilView from './PerfilView'
import TabBar from '../components/TabBar'

export default class DashboardView extends Component {
  render () {
    return (
      <ScrollableTabView renderTabBar={() => <TabBar />} tabBarPosition='bottom' >
        <SearchView name='searchView' tabLabel='search' />
        <InvoiceView name='invoiceView' tabLabel='tags' />
        <PaymentView name='paymentView' tabLabel='credit-card' />
        <PerfilView name='perfilView' tabLabel='user-o' />
      </ScrollableTabView>
    )
  }
}
