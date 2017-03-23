import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import {Scene, Router} from 'react-native-router-flux'
import LoginView from './LoginView'
import HomeView from './HomeView'
import CooperativaDetailView from './CooperativaDetailView'

export default class OroTicket extends Component {

  render () {
    return <Router>
      <Scene key='login' component={LoginView} hideNavBar />
      <Scene key='root'>
        <Scene key='home' component={HomeView} hideNavBar />
        <Scene key='cooperativaDetail' component={CooperativaDetailView} title='Cooperativa' hideNavBar />
      </Scene>
    </Router>
  }
}

AppRegistry.registerComponent('OroTicket', () => OroTicket)
