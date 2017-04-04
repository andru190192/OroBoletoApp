import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  DatePickerAndroid,
  TouchableWithoutFeedback,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native'

const iconDashboard = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAEEUlEQVR4Xu2c0W3VQBQFN4VQCWXAByWCRCPUQSGgSPnMxx6Nz761d/j2XHvvzHMSQHkb/jl6A29Hn97DDwM4PAIDMIDDN3D48X0DGMDhGzj8+L4BDODwDRx+fN8ABnD4Bg4/vm8AAzh8A4cf3zeAARy+gcOP7xvAAPAG/uEJawb8GmP8mLzV7zHGt8lrX30Z+hAj+OPkBvDaBJBDBBvAa81/3B05RLABGMD7BvwS8NoO0IcYwb4BXmveLwHZ/v0p4JN9+Qb4PCJ/DAw+XH4PECyrcCn6ECPY7wEKOvORyCGCDSC3VSCQQwQbQEFnPhI5RLAB5LYKBHKIYAMo6MxHIocINoDcVoFADhFsAAWd+UjkEMEGkNsqEMghgg2goDMfiRwi2AByWwUCOUSwARR05iORQwQbQG6rQCCHCDaAgs58JHKIYAPIbRUI5BDBBlDQmY9EDhFsALmtAoEcItgACjrzkcghgg0gt1UgkEMEG0BBZz4SOUSwAeS2CgRyiGADKOjMRyKHCDaA3FaBQA4RbAAFnflI5BDBDw4g13BTwgBuKu6qxzaAqzZ50zkGcFNxVz22AVy1yZvOMYCbirvqsQ3gqk3edI4B3FTcVY9tAFdt8qZzDOCm4q56bAP4fJNfxxhfrlpyec5PMt8APt+evyMoqMrfERQsq3Ap+hAj+MH/GOQbICjVN0CwrMKl6EOMYN8ABZ35SOQQwQaQ2yoQyCGCDaCgMx+JHCLYAHJbBQI5RLABFHTmI5FDBBtAbqtAIIcI/jjM98KhGiP/jjH+TA727wEmF/XUywzgqWYnz2UAk4t66mUG8FSzk+cygMlFPfUyA3iq2clzGcDkop56mQE81ezkuQxgclFPvcwAnmp28lwGMLmo98v8H0HBsgqXor/OR7D/GFTQmY9EDhFsALmtAoEcItgACjrzkcghgg0gt1UgkEMEG0BBZz4SOUSwAeS2CgRyiGADKOjMRyKHCDaA3FaBQA4RbAAFnflI5BDBBpDbKhDIIYINoKAzH4kcItgAclsFAjlEsAEUdOYjkUMEG0Buq0Aghwg2gILOfCRyiGADyG0VCOQQwQZQ0JmPRA4RbAC5rQKBHCLYAAo685HIIYINILdVIJBDBBtAQWc+EjlEsAHktgoEcohgAyjozEcihwg2gNxWgUAOEWwABZ35SOQQwQaQ2yoQyCGCDaCgMx+JHCLYAHJbBQI5RLABFHTmI5FDBBtAbqtAIIcINoCCznwkcojg/FkldtuAAexmZPHzGMDihe92OwPYzcji5zGAxQvf7XYGsJuRxc9jAIsXvtvtDGA3I4ufxwAWL3y32xnAbkYWP48BLF74brczgN2MLH4eA1i88N1uZwC7GVn8PAaweOG73c4AdjOy+Hn+A03mApB42WxdAAAAAElFTkSuQmCC'

const iconHeroes = 'data:image/png;base64,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'

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import ScrollableTabView, {DefaultTabBar } from 'react-native-scrollable-tab-view'
import Perfil from './PerfilView'

class Page extends Component {
  render () {
    return (
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <Text>{this.props.name}</Text>
      </View>
    )
  }
}

export default class HomeView extends Component {
  //
  // state = {
  //   simpleDate: new Date(),
  //   simpleText: 'Escoje una fecha'
  // }
  //
  // showPicker = async (stateKey, options) => {
  //   try {
  //     var newState = {};
  //     const {action, year, month, day} = await DatePickerAndroid.open(options);
  //     if (action === DatePickerAndroid.dismissedAction) {
  //       newState[stateKey + 'Text'] = 'dismissed';
  //     } else {
  //       var date = new Date(year, month, day);
  //       newState[stateKey + 'Text'] = date.toLocaleDateString();
  //       newState[stateKey + 'Date'] = date;
  //     }
  //     this.setState(newState);
  //   } catch ({code, message}) {
  //     console.warn(`Error in example '${stateKey}': `, message);
  //   }
  // };

  constructor (props) {
    super()

    this.state = {
      ciudadSalida: '',
      ciudadDestino: ''
    }
    this.handleCiudadSalida = this.handleCiudadSalida.bind(this)
    this.handleCiudadDestino = this.handleCiudadDestino.bind(this)
  }

  handleCiudadSalida (ciudadSalida) {
    this.setState({ ciudadSalida, ciudadDestino: '' })
    Actions.pop()
  }

  handleCiudadDestino (ciudadDestino) {
    this.setState({ ciudadDestino })
    Actions.pop()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <ScrollableTabView style={{ marginTop: 20 }} renderTabBar={() => <DefaultTabBar />} >
          <Page name='tab1' tabLabel='tab1' />
          <Page name='tab2' tabLabel='tab2' />
          <Page name='tab3' tabLabel='tab3' />
        </ScrollableTabView>

        {/* <Text style={styles.titulo}>BUSCA TU BOLETO</Text>
        <TouchableOpacity style={styles.combo} onPress={() => Actions.salidas({ handleCiudadSalida: this.handleCiudadSalida })}>
          <View style={styles.seleccion}>
            <Text style={styles.label}>Escoje tu salida</Text>
            <Text style={styles.element}>{this.state.ciudadSalida}</Text>
          </View>
          <Icon style={styles.icon} name='map-marker' size={32} color='#e74c3c' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.combo} onPress={() => Actions.destinos({ ciudadSalida: this.state.ciudadSalida, handleCiudadDestino: this.handleCiudadDestino })}>
          <View style={styles.seleccion}>
            <Text style={styles.label}>Escoje tu Destino</Text>
            <Text style={styles.element}>{this.state.ciudadDestino}</Text>
          </View>
          <Icon style={styles.icon} name='map-marker' size={32} color='#e74c3c' />
        </TouchableOpacity> */}

        {/* <TouchableWithoutFeedback style={styles.datePicker}
                onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
                <View>
                  <Text style={styles.text}>{this.state.simpleText}</Text>
                  <Icon style={styles.icon} name='map-marker' size={32} color='#e74c3c' />
                </View>
              </TouchableWithoutFeedback> */}
      </ScrollView
      >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  seleccion: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20
  },
  combo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 50,
    marginHorizontal: 10,
    borderColor: '#F0F0F0',
    borderWidth: 1

  },
  icon: {
    marginTop: 5,
    marginRight: 5
  },
  titulo: {
    margin: 20
  }
})
