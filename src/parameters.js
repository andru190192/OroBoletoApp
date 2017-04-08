module.exports = {
  URL: 'http://192.168.1.10:3000/api',
  TOKEN: '',
  getHeader: function () {
    return new Headers({
      'Authorization': `Bearer ${this.TOKEN}`,
      'Content-Type': 'application/json'
    })
  }
}