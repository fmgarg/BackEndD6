const express = require('express')
const PORT = 8080
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


//app.use(express.static('public'))

app.use(express.static('./public'))

/*app.get('/', (req, res) => {
  res.render('./views/index')
  //res.sendFile('index')
})*/

httpServer.listen(8080, () => console.log('servidor Levantado'))

//--------sockets-------
const messages = [
  { author: 'fmgarg@gmail.com', text: '¡Hola! ¿Que tal?' },
  { author: 'fmgarg@gmail.com', text: '¡Muy bien! ¿Y vos?' },
  { author: 'fmgarg@gmail.com', text: '¡Genial!' },
]

let eventos = [{"title":"tijera","price":"100","src":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","id":1},{"title":"cartuchera","price":"200","src":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","id":2},{"title":"mochila","price":"10000","src":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","id":3}]


io.on('connection', (socket) => {
  console.log('se conecto un usuario')
  socket.emit('messages', messages)
  socket.emit('socketEventos', eventos)
  socket.on('notificacion', (data) => {
    console.log(data)
  })

  socket.on('new-message', (data) => { 
    messages.push(data)
    io.sockets.emit('messages', messages)
  })
  socket.on('nuevo-evento', (data) => {
    eventos.push(data)
    io.sockets.emit('socketEventos', eventos)
  })

})

/*const server = app.listen(PORT, () => {
  console.log('servidor levantado en el puerto: ' + server.address().port)
})*/

//iniciar el servidor con menejo de errores
//server.on('error', (error) => console.log(`hubo un error ${error}`))

//metodo para enviar y recibir peticiones json
const router = express.Router()

//usar app delante de use hace que sea general y que toda la app pueda procesar JSON y siempre debe ir antes del router con la peticion**
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const productosRouter = require ('./routes/productosRouter')

//exponer las rutas a una app. router con la peticion**
app.use('/', productosRouter)

//handlebars
const handlebars = require('express-handlebars')

app.engine(
    'hbs',
    handlebars({
              extname: '.hbs',
              defaultLayout: 'index.hbs'
    })
  )
  
app.set('view engine', 'hbs')
app.set('views', './views')




