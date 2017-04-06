import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableHighlight
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import { signUP } from '../api-client'
const parameters = require('../parameters')

export default class PerfilView extends Component {
  constructor (props) {
    super()
    if (props.usuario === undefined) {
      this.state = {
        usuario: parameters.USER.usuario,
        cedulaRuc: parameters.USER.cedulaRuc,
        nombre: parameters.USER.nombre,
        apellido: parameters.USER.apellido,
        direccion: parameters.USER.direccion,
        email: parameters.USER.email,
        telefono: parameters.USER.telefono,
        ciudad: parameters.USER.ciudad,
        picture: parameters.USER.picture
      }
    } else {
      this.state = {
        usuario: props.usuario.id,
        cedulaRuc: '',
        nombre: props.usuario.first_name,
        apellido: props.usuario.last_name,
        direccion: '',
        email: props.usuario.email,
        telefono: '',
        ciudad: '',
        picture: props.usuario.picture.data.url
      }
    }
    console.log(this.state)
  }

  handleSignUp () {
    signUP(this.state)
    .then(data => {
      parameters.USER = data.persona
      parameters.USER.picture = this.state.picture
      parameters.TOKEN = data.token
      Actions.dashboard()
    })
    .catch(err => {
      console.warn(`${err}`)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.state.picture}} style={styles.picture} />
        <Text style={styles.titulo}>DATOS DE USUARIO</Text>
        <TextInput
          style={styles.input}
          placeholder='Cedula/Ruc'
          value={this.state.cedulaRuc}
          onChangeText={(cedulaRuc) => this.setState({ cedulaRuc })}
          />
        <TextInput style={styles.input}
          placeholder='Apellido'
          value={this.state.apellido}
          onChangeText={(apellido) => this.setState({ apellido })}
          />
        <TextInput style={styles.input}
          placeholder='Nombre'
          value={this.state.nombre}
          onChangeText={(nombre) => this.setState({ nombre })}
          />
        <TextInput style={styles.input}
          placeholder='Direccion'
          value={this.state.direccion}
          onChangeText={(direccion) => this.setState({ direccion })}
          />
        <TextInput style={styles.input}
          placeholder='Email'
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          />
        <TextInput style={styles.input}
          placeholder='Telefono'
          value={this.state.telefono}
          onChangeText={(telefono) => this.setState({ telefono })}
          />
        <TextInput style={styles.input}
          placeholder='Ciudad'
          value={this.state.ciudad}
          onChangeText={(ciudad) => this.setState({ ciudad })}
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
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center'
  }
})
