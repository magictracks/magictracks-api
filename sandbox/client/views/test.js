var html = require('choo/html')

module.exports = view

function view (state, emit) {
  return html`
    <body>
      <h1>Hello!</h1>
    </body>
  `
}