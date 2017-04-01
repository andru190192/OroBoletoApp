const URL = 'http://192.168.1.10:3000/api'
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZHJpYW5jb256YSIsImlhdCI6MTQ5MDM5NzY3OSwiZXhwIjoxNDkxNjA3Mjc5fQ.yjxuhv9bnJPDFsSvO6TycsjMVifwLBO6IZUO_qsSOEw'

function getOrigenes () {
  return fetch(URL + '/rutasAppMobile/ciudadOrigen', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + TOKEN
    }
  })
  .then(response => response.json())
  .then(data => data.ciudades)
}

function getDestinos (salida) {
  return fetch(URL + '/rutasAppMobile/ciudadDestino/' + salida, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + TOKEN
    }
  })
  .then(response => response.json())
  .then(data => data.ciudades)
}


function getPersona(usuarioId){
  console.warn('usuarioId',usuarioId);
  return fetch (URL+'/signIn',{
    method: 'POST',
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
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


function setPersona(objPersona){
  return fetch (URL+'/signUP',{
    method: 'POST',
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(objPersona)
  })
    .then(response => response.json().then(json => {
        json.status = response.status
        return json
      })
    )
}

export { getOrigenes, getDestinos, getPersona, setPersona }
