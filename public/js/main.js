const socket = io.connect()

socket.on('mi mensaje', (data) => {
  alert(data)
  socket.emit('notificacion', 'mensaje recibido con exito')
})

let hora = new Date ()

function render(data) {
  const html = data
  
    .map((elem, index) => {
      return `
            <div class="container">
                  <ul class="list-inline">
                        <li class="list-inline-item"><strong class="text-primary">${elem.author}</strong><p class="text-warning">${hora.toLocaleDateString()} - ${hora.toLocaleTimeString()}</p></li>
                        <li class="list-inline-item font-italic text-success"><em>${elem.text}</em></li> 
                  </ul>
            </div>
            `
    })
    .join(' ')
  document.getElementById('mensajes').innerHTML = html
}

socket.on('messages', function (data) {
  render(data)
})

function addMessage(e) {
  const mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value,
  }
  socket.emit('new-message', mensaje)
  return false
}
