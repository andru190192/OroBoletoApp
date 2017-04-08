import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import { signUP, updatePerson } from '../api-client'
import TextField from 'react-native-md-textinput'
const parameters = require('../parameters')

export default class PerfilView extends Component {

  constructor (props) {
    super()
    if (props.usuario === undefined) {
      this.nameBotton = 'MODIFICAR'
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
      this.nameBotton = 'GUARDAR'
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

  handleAction () {
    if (this.nameBotton === 'MODIFICAR') {
      updatePerson(this.state)
      .then(data => {
        // console.warn(data)
        parameters.USER = data.persona
        parameters.USER.picture = this.state.picture
        Actions.perfilView()
      })
      .catch(err => {
        console.warn(`${err}`)
      })
    } else {
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
  }

  cancelar () {
    console.warn('CANCELAR')
  }

  render () {
    return (
      <View style={styles.perfil}>
        <View style={styles.perfilPicture}>
          <Image source={{uri: this.state.picture}} style={styles.picture} />
          <Text style={styles.titulo}>DATOS DE USUARIO</Text>
        </View>
        <ScrollView>
          <TextField
            highlightColor={'#00BCD4'}
            label={'Cedula/Ruc'}
            value={this.state.cedulaRuc}
            maxLength={10}
            keyboardType={'phone-pad'}
            onChangeText={(cedulaRuc) => this.setState({ cedulaRuc })}
              />
          <TextField
            highlightColor={'#00BCD4'}
            label={'Apellido'}
            value={this.state.apellido}
            onChangeText={(apellido) => this.setState({ apellido })}
              />
          <TextField
            highlightColor={'#00BCD4'}
            label={'Nombre'}
            value={this.state.nombre}
            onChangeText={(nombre) => this.setState({ nombre })}
              />
          <TextField
            highlightColor={'#00BCD4'}
            label='Direccion'
            value={this.state.direccion}
            onChangeText={(direccion) => this.setState({ direccion })}
              />
          <TextField
            highlightColor={'#00BCD4'}
            label='Email'
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
              />
          <TextField
            highlightColor={'#00BCD4'}
            label='Telefono'
            value={this.state.telefono}
            onChangeText={(telefono) => this.setState({ telefono })}
              />
          <TextField
            highlightColor={'#00BCD4'}
            label='Ciudad'
            value={this.state.ciudad}
            onChangeText={(ciudad) => this.setState({ ciudad })}
              />
          <View style={styles.button}>
            <TouchableHighlight
              style={styles.buttonAction}
              onPress={() => this.handleAction()}>
              <Text style={styles.textButtom}>{this.nameBotton}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonCancelar}
              onPress={() => this.cancelar()}>
              <Text style={styles.textButtom}>CANCELAR</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  perfil: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  titulo: {
    margin: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonAction: {
    backgroundColor: 'skyblue',
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    height: 40,
    width: 150

  },
  buttonCancelar: {
    backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    height: 40,
    width: 150

  },
  textButtom: {
    textAlign: 'center',
    color: 'white'
  },
  // input: {
  //   height: 40,
  //   borderColor: '#CCC',
  //   borderWidth: 2,
  //   borderRadius: 5,
  //   marginBottom: 10,
  //   paddingHorizontal: 15
  // },
  perfilPicture: {
    backgroundColor: '#e74c3c'
  },
  picture: {
    marginTop: 15,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center'
  }
})
