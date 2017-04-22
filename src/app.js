import React, { Component } from 'react'
import { AppRegistry, Platform, Text, StyleSheet } from 'react-native'

import {Scene, Router} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

import LoginView from './views/LoginView'
import SearchView from './views/SearchView'
import OriginView from './views/OriginView'
import DestinationView from './views/DestinationView'
import TurnView from './views/TurnView'
import InvoiceView from './views/InvoiceView'
import PaymentView from './views/PaymentView'
import PaymentFormView from './views/PaymentFormView'
import PerfilView from './views/PerfilView'
import DashboardView from './views/DashboardView'
import SeatView from './views/SeatView'
import PreInvoiceView from './views/PreInvoiceView'

export default class OroTicketMobile extends Component {
  render () {
    const isAndroid = Platform.OS === 'android'
    return <Router getSceneStyle={getSceneStyle}>
      <Scene key='root'>
        <Scene key='login' component={LoginView} hideNavBar />
        <Scene key='dashboard' component={DashboardView} hideNavBar />
        <Scene key='search' component={SearchView} hideNavBar />
        <Scene key='origin' component={OriginView} title='Salidas' hideNavBar={isAndroid} direction='vertical' />
        <Scene key='destination' component={DestinationView} title='Destinos' hideNavBar={isAndroid} direction='vertical' />
        <Scene key='perfil' component={PerfilView} hideNavBar />
        <Scene key='invoice' component={InvoiceView} hideNavBar />
        <Scene key='paymentView' component={PaymentView} title='Lista de Tarjeta' hideNavBar />
        <Scene key='PaymentFormView' component={PaymentFormView} title='Tarjeta de Credito' hideNavBar={isAndroid} direction='vertical' />
        <Scene key='turn' component={TurnView} hideNavBar />
        <Scene key='preInvoice' component={PreInvoiceView} hideNavBar />
        <Scene key='seat' component={SeatView} hideNavBar />
      </Scene>
    </Router>
    // return <Router getSceneStyle={getSceneStyle}>
    //   <Scene key='root'>
    //     <Scene key='login' component={LoginView} hideNavBar />
    //     <Scene key='tabbar' tabs tabBarStyle={styles.tabBarStyle}
    //       tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
    //       <Scene key='searchRoot'
    //         icon={() => <Icon name='search' size={32} color='#e74c3c' />}
    //         navigationBarStyle={{backgroundColor: 'red'}}
    //         titleStyle={{color: 'white'}}>
    //         <Scene key='search' component={SearchView} hideNavBar />
    //         <Scene key='origin' component={OriginView} title='Salidas' hideNavBar direction='vertical' />
    //         <Scene key='destination' component={DestinationView} title='Destinos' hideNavBar={false} />
    //       </Scene>
    //       <Scene key='invoiceRoot'
    //         icon={() => <Icon name='tags' size={32} color='#e74c3c' />}
    //         navigationBarStyle={{backgroundColor: 'red'}}
    //         titleStyle={{color: 'white'}}>
    //         <Scene key='invoice' component={InvoiceView} hideNavBar />
    //       </Scene>
    //       <Scene key='paymentRoot'
    //         icon={() => <Icon name='credit-card' size={32} color='#e74c3c' />}
    //         navigationBarStyle={{backgroundColor: 'red'}}
    //         titleStyle={{color: 'white'}}>
    //         <Scene key='payment' component={PaymentView} hideNavBar />
    //       </Scene>
    //       <Scene key='perfilRoot'
    //         icon={() => <Icon name='user-o' size={32} color='#e74c3c' />}
    //         navigationBarStyle={{backgroundColor: 'red'}}
    //         titleStyle={{color: 'white'}}>
    //         <Scene key='perfil' component={PerfilView} hideNavBar />
    //       </Scene>
    //     </Scene>
    //   </Scene>
    // </Router>
  }
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee'
  },
  tabBarSelectedItemStyle: {
    color: '#e74c3c'
  }
})

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null
  }
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 50
    style.marginBottom = computedProps.hideTabBar ? 0 : 0
  }
  return style
}

AppRegistry.registerComponent('OroTicketMobile', () => OroTicketMobile)
