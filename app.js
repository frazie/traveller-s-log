const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

//LOAD CONFIG
dotenv.config({ path: './config/config.env' })

//passport config
require('./config/passport')(passport)

connectDB()

const app = express()


// LOGGING
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//HANDLEBARS
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
        })
    })
)

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')))

//ROUTES
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running on ${process.env.NODE_ENV} mode on PORT ${PORT}`)
)