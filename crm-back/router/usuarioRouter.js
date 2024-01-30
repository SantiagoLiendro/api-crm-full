import express from 'express'

import {
    crearUsuario, cambiarPassword,
    cofirmarCuenta, olvidePassword,
    olvidePasswordVerificarToken,
    iniciarSession
} from '../controllers/usuarioControllers.js'

const router = express.Router()

router.post('/crear_usuario', crearUsuario)

router.get('/confirmar_cuenta/:token', cofirmarCuenta)

router.post('/olvide_password', olvidePassword)

router.route('/cambiar_password/:token')
    .get(olvidePasswordVerificarToken)
    .put(cambiarPassword)

router.post('/iniciar_sesion', iniciarSession)




export default router