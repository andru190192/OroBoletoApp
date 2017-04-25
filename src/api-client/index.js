const ReactNative = require('react-native')
const {
  NetInfo
} = ReactNative

const parameters = require('../parameters')
const URL = `${parameters.URL}/api`

async function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    let message
    await response.json().then(body => { message = body.message })
    .catch(err => { message = 'Error URL mal formado' })
    let error = new Error(message)
    error.statusCode = response.status
    throw error
  }
}

// async function isConnected () {
//   let isConnected
//   await NetInfo.isConnected.fetch().then(value => { isConnected = value })
//   .catch(err => console.warn(err))
//   return isConnected
// }

function signIn (usuarioId) {
  // console.warn('isConnected', isConnected())
  return fetch(`${URL}/signIn`, {
    method: 'POST',
    headers: parameters.getHeader(),
    body: JSON.stringify({ usuario: usuarioId })
  })
  .then(checkStatus)
}

function signUP (usuario) {
  return fetch(`${URL}/signUp`, {
    method: 'POST',
    headers: parameters.getHeader(),
    body: JSON.stringify(usuario)
  })
  .then(checkStatus)
}

function updatePerson (usuario) {
  return fetch(`${URL}/persona/${usuario.cedulaRuc}`, {
    method: 'PUT',
    headers: parameters.getHeader(),
    body: JSON.stringify(usuario)
  })
  .then(checkStatus)
}

function getFormasPagos (cedulaRuc) {
  return fetch(`${URL}/formasPagosAppMobile/${cedulaRuc}`, {
    headers: parameters.getHeader()
  })
  .then(checkStatus)
}

function setFormaPago (formaPago) {
  return fetch(`${URL}/formaPagoAppMobile`, {
    method: 'POST',
    headers: parameters.getHeader(),
    body: JSON.stringify(formaPago)
  })
  .then(checkStatus)
}

function updateFormaPago (formaPago) {
  return fetch(`${URL}/formaPagoAppMobile/${formaPago.id}`, {
    method: 'PUT',
    headers: parameters.getHeader(),
    body: JSON.stringify(formaPago)
  })
  .then(checkStatus)
}

function getOrigenes () {
  return fetch(`${URL}/rutasAppMobile/ciudadOrigen`, {
    headers: parameters.getHeader()
  })
  .then(checkStatus)
}

function getDestinos (origen) {
  return fetch(`${URL}/rutasAppMobile/ciudadDestino/${origen}`, {
    headers: parameters.getHeader()
  })
  .then(checkStatus)
}

function getTurnos (origen, destino, fecha) {
  return fetch(`${URL}/turnosAppMobile/${origen}/${destino}/${fecha}`, {
    headers: parameters.getHeader()
  })
  .then(checkStatus)
}

function getTurnoVehiculo (turno, fecha) {
  return fetch(`${URL}/turnoVehiculoAppMobile/${turno}/${fecha}`, {
    headers: parameters.getHeader()
  })
  .then(checkStatus)
}

export {
  signIn,
  signUP,
  updatePerson,
  getFormasPagos,
  setFormaPago,
  updateFormaPago,
  getOrigenes,
  getDestinos,
  getTurnos,
  getTurnoVehiculo
}
