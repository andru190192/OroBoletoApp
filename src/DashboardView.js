import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PerfilView from './PerfilView'
import HomeView from './HomeView'
import FacturaView from './FacturaView'
import TabBar from './TabBar'

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
