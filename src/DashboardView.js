import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import ScrollableTabView, {DefaultTabBar } from 'react-native-scrollable-tab-view'
import PerfilView from './PerfilView'
import HomeView from './HomeView'
import FacturaView from './FacturaView'

export default class DashboardView extends Component {

  render () {
    return (
      <ScrollableTabView renderTabBar={() => <DefaultTabBar />} tabBarPosition='bottom' >
        <PerfilView name='perfil' tabLabel='tab1' />
        <HomeView name='home' tabLabel='tab2' />
        <FacturaView name='factura' tabLabel='tab3' />
      </ScrollableTabView>
    )
  }
}
