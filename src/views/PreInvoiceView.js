import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class FacturaView extends Component {
  handleComprar () {
    Alert.alert('OroTicket', 'Compra Exitosa.\nSu factura se envio a su correo paulo@adrianconza.com')
    Actions.dashboard()
  }

  render () {
    return (
      <View style={styles.grupoVertical}>
        <View style={styles.grupoHorizontal}>
          <View>
            <Text>Cooperativa :</Text>
            <Text>Nombre :</Text>
            <Text>Cedula :</Text>
            <Text>Fecha :</Text>
            <Text>Salida :</Text>
            <Text>Destino :</Text>
            <Text>Asiento :</Text>
            <Text>Hora :</Text>
            <Text>Precio :</Text>
            <Text>Comision :</Text>
            <Text>Total a Pagar :</Text>
          </View>
          <View>
            <Text>OroGuayas</Text>
            <Text>Conza Apolo Paulo Adrian</Text>
            <Text>0704997360</Text>
            <Text>17/04/2017</Text>
            <Text>Machala</Text>
            <Text>Guayaquil</Text>
            <Text>{this.props.asiento}</Text>
            <Text>01:30</Text>
            <Text>$10.00</Text>
            <Text>$1.50</Text>
            <Text>$11.50</Text>
          </View>
        </View>
        <View style={styles.grupoHorizontal}>
          <TouchableOpacity
            style={styles.buttonAction}
            onPress={() => this.handleComprar()}>
            <Text style={styles.textButtom}>COMPRAR</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonAction: {
    backgroundColor: 'skyblue',
    marginTop: 10,
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
  grupoHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1
  },
  grupoVertical: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#F3F3F3'
  },
  grupoHorizontalLabel: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1
  }
})
