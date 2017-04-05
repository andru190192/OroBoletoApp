import React, { Component } from 'react'
import { AppRegistry, Platform } from 'react-native'

import {Scene, Router} from 'react-native-router-flux'

import LoginView from './views/LoginView'
import PersonaView from './views/PersonView'
import HomeView from './views/HomeView'
import SalidasView from './views/OriginView'
import DestinosView from './views/DestinationView'
import DashboardView from './views/DashboardView'

export default class OroTicketMobile extends Component {
//  <Scene key='persona' component={PersonaView} hideNavBar />
//
  render () {
    const isAndroid = Platform.OS === 'android'
    return <Router>
      <Scene key='login' component={LoginView} hideNavBar />
      <Scene key='persona' component={PersonaView} hideNavBar />
      <Scene key='root'>
        <Scene key='dashboard' component={DashboardView} hideNavBar />
        <Scene key='home' component={HomeView} hideNavBar />
        <Scene key='salidas' component={SalidasView} title='Salidas' hideNavBar={isAndroid} />
        <Scene key='destinos' component={DestinosView} title='Destinos' hideNavBar={isAndroid} />
      </Scene>
    </Router>
  }
}

AppRegistry.registerComponent('OroTicketMobile', () => OroTicketMobile)
