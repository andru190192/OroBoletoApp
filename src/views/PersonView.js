import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  TouchableHighlight
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import { setPersona } from './api-client'

export default class PersonaView extends Component {
  constructor (props) {
    super()
    this.state = {
      usuario: props.usuarioFb.id,
      cedulaRuc: '',
      nombre: props.usuarioFb.last_name,
      apellido: props.usuarioFb.first_name,
      direccion: '',
      email: props.usuarioFb.email,
      telefono: '',
      ciudad: ''
    }
  }

  changeCedulaRuc (cedulaRuc) {
    this.setState({cedulaRuc})
  }
  changeNombre (nombre) {
    this.setState({nombre})
  }
  changeApellido (apellido) {
    this.setState({apellido})
  }
  changeEmail (email) {
    this.setState({email})
  }
  changeDireccion (direccion) {
    this.setState({direccion})
  }
  changeTelefono (telefono) {
    this.setState({telefono})
  }
  changeCiudad (ciudad) {
    this.setState({ciudad})
  }

  buttonPressed () {
    const objPersona = {
      cedulaRuc: this.state.cedulaRuc,
      usuario: this.state.usuario,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      direccion: this.state.direccion,
      email: this.state.email,
      telefono: this.state.telefono,
      ciudad: this.state.ciudad
    }
    setPersona(objPersona).then(datoPersona => {
      if (datoPersona.status.toString() === '200') {
        Alert.alert(
          'Datos de usuario',
          'Se ingreso Correctamente',
          [
            {text: 'OK', onPress: () => Actions.root()}
          ],
          { cancelable: false }
        )
      } else if (datoPersona.status.toString() === '404') {
        console.warn('error')
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>DATOS DE USUARIO</Text>
        <TextInput
          style={styles.input}
          placeholder='Cedula/Ruc'
          value={this.state.cedulaRuc}
          onChangeText={(cedulaRuc) => this.changeCedulaRuc(cedulaRuc)}
          />
        <TextInput style={styles.input}
          placeholder='Nombre'
          value={this.state.nombre}
          onChangeText={(nombre) => this.changeNombre(nombre)}
          />
        <TextInput style={styles.input}
          placeholder='Apellido'
          value={this.state.apellido}
          onChangeText={(apellido) => this.changeApellido(apellido)}
          />
        <TextInput style={styles.input}
          placeholder='Direccion'
          value={this.state.direccion}
          onChangeText={(direccion) => this.changeDireccion(direccion)}
          />
        <TextInput style={styles.input}
          placeholder='Email'
          value={this.state.email}
          onChangeText={(email) => this.changeEmail(email)}
          />
        <TextInput style={styles.input}
          placeholder='Telefono'
          value={this.state.telefono}
          onChangeText={(telefono) => this.changeTelefono(telefono)}
          />
        <TextInput style={styles.input}
          placeholder='Ciudad'
          value={this.state.ciudad}
          onChangeText={(ciudad) => this.changeCiudad(ciudad)}
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
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  titulo: {
    margin: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'skyblue',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5

  },
  textButtom: {
    textAlign: 'center',
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15
  }
})
