import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  AlertIOS,

} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getPersona } from './api-client'
export default class PersonaView extends Component {


  constructor(){
    super()
    this.state= {
      usuario:'',
      cedulaRuc:'',
      nombre:'',
      apellido:'',
      direccion:'',
      apellido:'',
      direccion:'',
      email:'',
      telefono:'',
      ciudad:''
    }
  }
  changeUsuario(usuario){
    this.setState({usuario})
  }

  buttonPressed(){
      getPersona().then(d => console.warn('d', d))
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>DATOS DE PERSON</Text>

        <TextInput style={styles.input}
          placeholder="Usuario"
          value={this.state.usuario}
          onChangeText={(usuario)=> this.changeUsuario(usuario)}
        />
        <TextInput style={styles.input}
          placeholder="Cedula/ruc"
          value={this.state.cedulaRuc}
        />
        <TextInput style={styles.input}
          placeholder="Nombre"
          value={this.state.nombre}
        />
        <TextInput style={styles.input}
          placeholder="Apellido"
          value={this.state.apellido}
        />
        <TextInput style={styles.input}
          placeholder="Direccion"
          value={this.state.direccion}
        />
        <TextInput style={styles.input}
          placeholder="Email"
          value={this.state.email}
        />
        <TextInput style={styles.input}
          placeholder="Telefono"
          value={this.state.telefono}
        />
        <TextInput style={styles.input}
          placeholder="ciudad"
          value={this.state.ciudad}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.buttonPressed()}>
          <Text style={styles.textButtom}>Send</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    marginTop:30,
    paddingLeft:15,
    paddingRight:15
  },
  titulo: {
    margin: 20
  },
  button:{
    backgroundColor:'skyblue',
    paddingTop:15,
    paddingBottom:15,
  },
  textButtom:{
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth:2,
    marginBottom:20,
  },
})
