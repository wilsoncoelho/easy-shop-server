const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv/config')
const api = process.env.API_URL;
const productsRouter = require('./routers/products')
const categoriesRouter = require('./routers/categories')
const usersRouter = require('./routers/users')
const ordersRouter = require('./routers/orders')
const cors = require('cors');
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')

app.use(cors())
app.options('*', cors())

// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(errorHandler)

//Routes
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/orders`, ordersRouter)
app.use(`${api}/users`, usersRouter)


// Connecting to the database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'eshop-database'
})
.then(()=>{
    console.log('Database Connected')
})
.catch((err)=>{
    console.log(err)
})

// listening to the server for development.
app.listen(3000, ()=>{ 
    console.log('Server is running http://localhost:3000')
})

// listening to the server for Production.

// let server = app.listen(process.env.PORT || 3000, ()=>{
//     var port = server.address().port
//     console.log('Express is working on port '+ port)
// })