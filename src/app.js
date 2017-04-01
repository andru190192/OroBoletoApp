import React, { Component } from 'react'
import { AppRegistry, Platform } from 'react-native'

import {Scene, Router} from 'react-native-router-flux'

import LoginView from './LoginView'
import PersonaView from './PersonaView'
import HomeView from './HomeView'
import SalidasView from './SalidasView'
import DestinosView from './DestinosView'


export default class OroTicketMobile extends Component {
//  <Scene key='persona' component={PersonaView} hideNavBar />
  render () {
    const isAndroid = Platform.OS === 'android'
    return <Router>

    <Scene key='login' component={LoginView} hideNavBar />

      <Scene key='root'>
        
        <Scene key='home' component={HomeView} hideNavBar />
        <Scene key='salidas' component={SalidasView} title='Salidas' hideNavBar ={isAndroid}/>
        <Scene key='destinos' component={DestinosView} title='Destinos' hideNavBar ={isAndroid}/>
      </Scene>
    </Router>
  }
}

AppRegistry.registerComponent('OroTicketMobile', () => OroTicketMobile)
