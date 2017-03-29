import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import {Scene, Router} from 'react-native-router-flux'
import LoginView from './LoginView'
import HomeView from './HomeView'
import SalidasView from './SalidasView'
import DestinosView from './DestinosView'

export default class OroTicketMobile extends Component {

  render () {
    return <Router>
      <Scene key='login' component={LoginView} hideNavBar />
      <Scene key='root'>
        <Scene key='home' component={HomeView} hideNavBar />
        <Scene key='salidas' component={SalidasView} title='Salidas' hideNavBar />
        <Scene key='destinos' component={DestinosView} title='Destinos' hideNavBar />
      </Scene>
    </Router>
  }
}

AppRegistry.registerComponent('OroTicketMobile', () => OroTicketMobile)
