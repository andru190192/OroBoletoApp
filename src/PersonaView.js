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
import { getPersona, setPersona } from './api-client'
export default class PersonaView extends Component {


  constructor(){
    super()
    this.state= {
      usuario:'carlosAlberto',
      cedulaRuc:'0703865584',
      nombre:'CARLOS',
      apellido:'AJILA',
      direccion:'GUABO Y NOVENA OESTE',
      email:'carlos.ajila@gmail.com',
      telefono:'2939653',
      ciudad:'machala'
    }
  }
  changeUsuario(usuario){
    this.setState({usuario})
  }
  changeCedulaRuc(cedulaRuc){
    this.setState({cedulaRuc})
  }
  changeNombre(nombre){
    this.setState({nombre})
  }
  changeApellido(apellido){
    this.setState({apellido})
  }
  changeEmail(email){
    this.setState({email})
  }
  changeDireccion(direccion){
    this.setState({direccion})
  }
  changeTelefono(telefono){
    this.setState({telefono})
  }
  changeCiudad(ciudad){
    this.setState({ciudad})
  }

  buttonPressed(){
     //crear un objeto
    const objPersona = {
      cedulaRuc: this.state.cedulaRuc,
      usuario: this.state.usuario,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      direccion: this.state.direccion,
      email: this.state.email,
      telefono: this.state.telefono,
      ciudad : this.state.ciudad,
    }

    setPersona(objPersona).then(d => console.warn('d', d))
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
          onChangeText={(cedulaRuc)=> this.changeCedulaRuc(cedulaRuc)}
        />
        <TextInput style={styles.input}
          placeholder="Nombre"
          value={this.state.nombre}
          onChangeText={(nombre)=> this.changeNombre(nombre)}
        />
        <TextInput style={styles.input}
          placeholder="Apellido"
          value={this.state.apellido}
          onChangeText={(apellido)=> this.changeApellido(apellido)}
        />
        <TextInput style={styles.input}
          placeholder="Direccion"
          value={this.state.direccion}
          onChangeText={(direccion)=> this.changeDireccion(direccion)}
        />
        <TextInput style={styles.input}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(email)=> this.changeEmail(email)}
        />
        <TextInput style={styles.input}
          placeholder="Telefono"
          value={this.state.telefono}
          onChangeText={(telefono)=> this.changeTelefono(telefono)}
        />
        <TextInput style={styles.input}
          placeholder="ciudad"
          value={this.state.ciudad}
          onChangeText={(ciudad)=> this.changeCiudad(ciudad)}
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
