const config = require('../parameters')

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
  return fetch(`${config.URL}/signIn`, {
    method: 'POST',
    headers: config.getHeader(),
    body: JSON.stringify({ usuario: usuarioId })
  })
  .then(checkStatus)
}

function signUP (usuario) {
  return fetch(`${config.URL}/signUp`, {
    method: 'POST',
    headers: config.getHeader(),
    body: JSON.stringify({ usuario })
  })
  .then(checkStatus)
}

function getOrigenes () {
  return fetch(`${config.URL}/rutasAppMobile/ciudadOrigen`, {
    headers: config.getHeader()
  })
  .then(checkStatus)
}

function getDestinos (origen) {
  return fetch(`${config.URL}/rutasAppMobile/ciudadDestino/${origen}`, {
    headers: config.getHeader()
  })
  .then(checkStatus)
}

function getTurnos (origen, destino, fecha) {
  return fetch(`${config.URL}/rutasAppMobile/ciudadDestino/${origen}/${destino}/${fecha}`, {
    headers: config.getHeader()
  })
  .then(checkStatus)
}

export { signIn, signUP, getOrigenes, getDestinos, getTurnos }
