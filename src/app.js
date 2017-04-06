import React, { Component } from 'react'
import { AppRegistry, Platform } from 'react-native'

import {Scene, Router} from 'react-native-router-flux'

import LoginView from './views/LoginView'
import PerfilView from './views/PerfilView'
import SearchView from './views/SearchView'
import OriginView from './views/OriginView'
import DestinationView from './views/DestinationView'
import DashboardView from './views/DashboardView'
import TurnView from './views/TurnView'

export default class OroTicketMobile extends Component {
  render () {
    const isAndroid = Platform.OS === 'android'
    return <Router>
      <Scene key='root'>
        <Scene key='login' component={LoginView} hideNavBar />
        <Scene key='dashboard' component={DashboardView} hideNavBar />
        <Scene key='search' component={SearchView} hideNavBar />
        <Scene key='origin' component={OriginView} title='Salidas' hideNavBar={isAndroid} />
        <Scene key='destination' component={DestinationView} title='Destinos' hideNavBar={isAndroid} />
        <Scene key='perfil' component={PerfilView} hideNavBar />
        <Scene key='turno' component={TurnView} hideNavBar />
      </Scene>
    </Router>
  }
}

AppRegistry.registerComponent('OroTicketMobile', () => OroTicketMobile)
