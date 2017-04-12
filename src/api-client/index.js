const parameters = require('../parameters')

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

function signIn (usuarioId) {
  return fetch(`${parameters.URL}/signIn`, {
    method: 'POST',
    headers: parameters.getHeader(),
    body: JSON.stringify({ usuario: usuarioId })
  })
  .then(checkStatus)
}

function signUP (usuario) {
  return fetch(`${parameters.URL}/signUp`, {
    method: 'POST',
    headers: parameters.getHeader(),
    body: JSON.stringify(usuario)
  })
  .then(checkStatus)
}

function updatePerson (usuario) {
  return fetch(`${parameters.URL}/persona/0703865584`, {
    method: 'PUT',
    headers: parameters.getHeader(),
    body: JSON.stringify(usuario)
  })
  .then(checkStatus)
}

function getFormasPagos (cedulaRuc) {
  return fetch(`${parameters.URL}/formasPagosAppMobile/${cedulaRuc}`, {
    headers: parameters.getHeader()
  })
  .then(checkStatus)
}

function setFormaPago (formaPago) {
  return fetch(`${parameters.URL}/formaPagoAppMobile`, {
    method: 'POST',
    headers: parameters.getHeader(),
    body: JSON.stringify(formaPago)
  })
  .then(checkStatus)
}

function getOrigenes () {
  return fetch(`${parameters.URL}/rutasAppMobile/ciudadOrigen`, {
    headers: parameters.getHeader()
  })
  .then(checkStatus)
}

function getDestinos (origen) {
  return fetch(`${parameters.URL}/rutasAppMobile/ciudadDestino/${origen}`, {
    headers: parameters.getHeader()
  })
  .then(checkStatus)
}

function getTurnos (origen, destino, fecha) {
  return fetch(`${parameters.URL}/turnosAppMobile/${origen}/${destino}/${fecha}`, {
    headers: parameters.getHeader()
  })
  .then(checkStatus)
}

export { signIn, signUP, updatePerson, getFormasPagos, setFormaPago, getOrigenes, getDestinos, getTurnos }
