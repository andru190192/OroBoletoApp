import React, { Component } from 'react'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PerfilView from './PerfilView'
import HomeView from './HomeView'
import FacturaView from './InvoiceView'
import TabBar from '../components/TabBar'

export default class DashboardView extends Component {
  render () {
    return (
      <ScrollableTabView renderTabBar={() => <TabBar />} tabBarPosition='bottom' initialPage={1} >
        <PerfilView name='perfil' tabLabel='user-o' />
        <HomeView name='home' tabLabel='money' />
        <FacturaView name='factura' tabLabel='calendar-times-o' />
      </ScrollableTabView>
    )
  }
}
