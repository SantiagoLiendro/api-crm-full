import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


import routeUsuarios from './router/usuarioRouter.js'
import appRouter from './router/appRouter.js'


dotenv.config('.env')

const dominiosPermitidos = process.env.URL_FRON

// const corsOption = {
//     origin: function (origin, cb) {
//         if (dominiosPermitidos.indexOf(origin) !== -1 || !origin) {
//             cb(null, true)
//         } else {
//             cb(new Error('Not allowed by CORS'))
//         }
//     }
// }

const app = express()

app.use(cookieParser())
app.use(cors({
    origin: dominiosPermitidos,
    credentials: true
}))
app.use(json())
// app.use(express.urlencoded({ extended: true }))

//Routing
app.use('/', routeUsuarios)
app.use('/inicio', appRouter)

export default app