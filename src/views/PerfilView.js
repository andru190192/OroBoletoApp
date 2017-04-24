import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  Platform,
  AsyncStorage
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import { signUP, updatePerson } from '../api-client'
import TextField from 'react-native-md-textinput'
const parameters = require('../parameters')
import { LoginButton } from 'react-native-fbsdk'
import Button from '../components/Button'

export default class PerfilView extends Component {
  constructor (props) {
    super()
    if (props.usuario === undefined) {
      this.nameBotton = 'Modificar'
      this.state = {
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
      this.nameBotton = 'Guardar'
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
    this.handleAction = this.handleAction.bind(this)
    this.handleCancelar = this.handleCancelar.bind(this)
  }

  handleAction () {
    if (this.nameBotton === 'Modificar') {
      updatePerson(this.state)
      .then(data => {
        parameters.USER = data.persona
        parameters.USER.picture = this.state.picture
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

  handleCancelar () {
    this.setState({
      cedulaRuc: parameters.USER.cedulaRuc,
      nombre: parameters.USER.nombre,
      apellido: parameters.USER.apellido,
      direccion: parameters.USER.direccion,
      email: parameters.USER.email,
      telefono: parameters.USER.telefono,
      ciudad: parameters.USER.ciudad,
      picture: parameters.USER.picture
    })
  }

  handleSalir () {
    parameters.TOKEN = ''
    AsyncStorage.removeItem('@OroTicket:TOKEN', err => { if (err) console.log(err) })
    Actions.login({type: 'reset', TOKEN: null})
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.perfil}>
          <Text style={styles.titulo}>{this.nameBotton === 'Modificar' ? 'PERFIL' : 'REGISTRATE'}</Text>
          <Image source={{uri: this.state.picture}} style={styles.picture} />
          <View style={styles.grupoHorizontal}>
            <LoginButton onLogoutFinished={this.handleSalir} />
          </View>
          <TextField style={styles.TextField}
            highlightColor={'#00BCD4'}
            label={'Cedula/Ruc'}
            value={this.state.cedulaRuc}
            maxLength={13}
            keyboardType={'numeric'}
            onChangeText={(cedulaRuc) => this.setState({ cedulaRuc })}
              />
          <TextField style={styles.TextField}
            highlightColor={'#00BCD4'}
            label={'Apellido'}
            value={this.state.apellido}
            onChangeText={(apellido) => this.setState({ apellido })}
              />
          <TextField style={styles.TextField}
            highlightColor={'#00BCD4'}
            label={'Nombre'}
            value={this.state.nombre}
            onChangeText={(nombre) => this.setState({ nombre })}
              />
          <TextField style={styles.TextField}
            highlightColor={'#00BCD4'}
            label='Direccion'
            value={this.state.direccion}
            onChangeText={(direccion) => this.setState({ direccion })}
              />
          <TextField style={styles.TextField}
            highlightColor={'#00BCD4'}
            label='Email'
            value={this.state.email}
            keyboardType={'email-address'}
            onChangeText={(email) => this.setState({ email })}
              />
          <TextField style={styles.TextField}
            highlightColor={'#00BCD4'}
            label='Telefono'
            value={this.state.telefono}
            maxLength={13}
            keyboardType={'phone-pad'}
            onChangeText={(telefono) => this.setState({ telefono })}
              />
          <TextField style={styles.TextField}
            highlightColor={'#00BCD4'}
            label='Ciudad'
            value={this.state.ciudad}
            onChangeText={(ciudad) => this.setState({ ciudad })}
              />
          <View style={styles.grupoHorizontal}>
            <Button text={this.nameBotton} onPress={this.handleAction} primary icon='check' />
            <Button text='Cancelar' onPress={this.handleCancelar} icon='times' />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F3F3'
  },
  perfil: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  titulo: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: (Platform.OS === 'ios') ? 30 : 20,
    color: '#1E70B8'
  },
  buttonAction: {
    backgroundColor: 'skyblue',
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    height: 40,
    width: 150,
    marginVertical: 10,
    marginHorizontal: 5
  },
  buttonCancelar: {
    backgroundColor: '#e74c3c',
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 5,
    height: 40,
    width: 150,
    marginVertical: 10,
    marginHorizontal: 5
  },
  textButtom: {
    textAlign: 'center',
    color: 'white'
  },
  perfilPicture: {
    backgroundColor: '#e74c3c'
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center'
  },
  TextField: {
    height: 40
  },
  grupoHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    marginTop: 10
  }
})
