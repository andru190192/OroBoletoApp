module.exports = {
  USER: '',
  URL: 'https://oro-ticket-server.herokuapp.com/api',
  TOKEN: '',
  getHeader: function () {
    return new Headers({
      'Authorization': `Bearer ${this.TOKEN}`,
      'Content-Type': 'application/json'
    })
  }
}
