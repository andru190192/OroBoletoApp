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
import { signUP } from '../api-client'

export default class PerfilView extends Component {
  constructor (props) {
    super()
    this.state = {
      usuario: {
        usuario: props.usuario.id,
        cedulaRuc: '',
        nombre: props.usuario.first_name,
        apellido: props.usuario.last_name,
        direccion: '',
        email: props.usuario.email,
        telefono: '',
        ciudad: ''
      }
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

  handleSignUp () {
    signUP(this.state.usuario).then(datoPersona => {
      if (datoPersona.status.toString() === '200') {
        Alert.alert(
          'Datos de usuario',
          'Se ingreso Correctamente',
          [
            {text: 'OK', onPress: () => Actions.root()}
          ],
          { cancelable: false }
        )

        // config.USER = data.persona
        // config.TOKEN = data.token
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
          value={this.state.usuario.cedulaRuc}
          // onChangeText={(cedulaRuc) => this.changeCedulaRuc(cedulaRuc)}
          />
        <TextInput style={styles.input}
          placeholder='Apellido'
          value={this.state.usuario.apellido}
          onChangeText={(apellido) => this.changeApellido(apellido)}
          />
        <TextInput style={styles.input}
          placeholder='Nombre'
          value={this.state.usuario.nombre}
          onChangeText={(nombre) => this.changeNombre(nombre)}
          />
        <TextInput style={styles.input}
          placeholder='Direccion'
          value={this.state.usuario.direccion}
          onChangeText={(direccion) => this.changeDireccion(direccion)}
          />
        <TextInput style={styles.input}
          placeholder='Email'
          value={this.state.usuario.email}
          onChangeText={(email) => this.changeEmail(email)}
          />
        <TextInput style={styles.input}
          placeholder='Telefono'
          value={this.state.usuario.telefono}
          onChangeText={(telefono) => this.changeTelefono(telefono)}
          />
        <TextInput style={styles.input}
          placeholder='Ciudad'
          value={this.state.usuario.ciudad}
          onChangeText={(ciudad) => this.changeCiudad(ciudad)}
          />

        <TouchableHighlight
          style={styles.button}
          onPress={() => this.handleSignUp()}>
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
