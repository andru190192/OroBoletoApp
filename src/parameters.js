module.exports = {
  USER: '',
<<<<<<< HEAD
  // URL: 'https://oro-ticket-server.herokuapp.com/api',
  URL: 'http://192.168.1.10:3000/api',
=======
  URL: 'https://oro-ticket-server.herokuapp.com/api',
  // URL: 'http://192.168.1.10:3000/api',
>>>>>>> origin/master
  TOKEN: '',
  getHeader: function () {
    return new Headers({
      'Authorization': `Bearer ${this.TOKEN}`,
      'Content-Type': 'application/json'
    })
  }
}
