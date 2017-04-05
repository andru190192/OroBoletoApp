const config = require('../../config')
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZHJpYW5jb256YSIsImlhdCI6MTQ5MDM5NzY3OSwiZXhwIjoxNDkxNjA3Mjc5fQ.yjxuhv9bnJPDFsSvO6TycsjMVifwLBO6IZUO_qsSOEw'

let headers = new Headers({
  'Authorization': 'Bearer ' + TOKEN,
  'Content-Type': 'application/json'
})

async function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    console.log(response)
    let message
    await response.json().then(body => { message = body.message })
    .catch(err => { message = 'Error URL mal formado' })
    let error = new Error(message)
    error.statusCode = response.status
    throw error
  }
}

function getOrigenes () {
  return fetch(`${config.URL}/rutasAppMobile/ciudadOrigen`, { headers })
  .then(checkStatus)
}

function getDestinos (salida) {
  return fetch(`${config.URL}/rutasAppMobile/ciudadDestino/${salida}`, { headers })
  .then(checkStatus)
}

function getPersona (usuarioId) {
  return fetch(config.URL + '/signIn', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      usuario: usuarioId
    })
  })
    .then(response => response.json().then(json => {
      json.status = response.status
      return json
    })
    )
}

function setPersona (objPersona) {
  return fetch(config.URL + '/signUP', {
    method: 'POST',
    headers,
    body: JSON.stringify(objPersona)
  })
    .then(response => response.json().then(json => {
      json.status = response.status
      return json
    })
    )
}

export { getOrigenes, getDestinos, getPersona, setPersona }
