import bcrypt from 'bcrypt'

import { Usuarios } from '../models/index.js';
import { generarId, generarJWT } from '../helpers/tokens.js';
import { confirmarCuenta, mailOlvidePassword } from '../helpers/emails.js';




const crearUsuario = async (req, res, next) => {
    const { email, password, nombre, apellido } = req.body

    const usuario = await Usuarios.scope('eliminarPassword').findOne({ where: { email } });

    if (usuario) {
        res.status(403).json({ msg: "Ya existe un usuario con ese email" })
        return next()
    }

    if (Object.values(req.body).includes('')) {
        res.json({ msg: "Todos los campos son obligatorios" })
        return next()
    }

    if (password.length < 8) {
        res.json({ msg: "La contraseña debe tener al menos 8 caracteres" })
        return next()
    }

    const token = generarId()

    try {
        await Usuarios.create({ ...req.body, token })
        res.status(200).json({ msg: "Tu cuenta fue creada correctamente, revisa tu email para confirmar tu cuenta." })
        await confirmarCuenta({ nombre, apellido, token, email })
        return

    } catch (error) {
        const msgError = new Error(error)
        res.status(404).json({ msg: msgError.message })
        return next()
    }
}

const cofirmarCuenta = async (req, res, next) => {
    const { token } = req.params

    const usuario = await Usuarios.findOne({ where: { token } });

    if (!usuario) {
        res.status(403).json({ msg: "No se encuentra ningun usuario." })
        return next()
    }


    if (usuario.confirmado) {
        res.status(403).json({ msg: "La cuenta ya esta confirmada, inicia sesion." })
        return next()
    }

    try {
        usuario.token = null
        usuario.confirmado = true
        await usuario.save()
        res.status(200).json({ msg: "Usuario confirmado correctamente." })
        return
    } catch (error) {
        const msgError = new Error(error)
        res.json({ msg: msgError.message })
        return next()
    }

}

const olvidePassword = async (req, res, next) => {
    const { email } = req.body

    const existeUsuario = await Usuarios.findOne({ where: { email } })

    if (!existeUsuario) {
        res.status(404).json({ msg: "El correo no pertenece a ningun usuario." })
        return next()
    }

    if (!existeUsuario.confirmado) {
        res.status(403).json({ msg: "Tu cuenta no fue confirmada, confirma tu cuenta para continuar." })
        return next()
    }

    if (existeUsuario.token && existeUsuario.confirmado) {
        res.status(403).json({ msg: "Ya solicitaste un cambio de contraseña,revisa la bandeja de tu email." })
        return next()
    }

    const token = generarId()

    try {
        existeUsuario.token = token
        await existeUsuario.save()
        const { apellido, nombre } = existeUsuario
        await mailOlvidePassword({ email, token, nombre, apellido })
        res.status(200).json({ msg: "Te enviamos un mensaje a tu correo, sigue las instrucciones para cambiar tu contraseña." })
        return

    } catch (error) {
        const msgError = new Error(error)
        res.json({ msg: msgError.message })
        return
    }

}

const olvidePasswordVerificarToken = async (req, res, next) => {
    const { token } = req.params

    const existeUsuario = await Usuarios.findOne({ where: { token } })

    if (!existeUsuario) {
        res.status(404).json({ msg: "No se encontro ningun usuario." })
        return next()
    }

    if (!existeUsuario.confirmado) {
        res.status(403).json({ msg: "Tu cuenta no fue confirmada, confirma tu cuenta para continuar." })
        return next()
    }

}


const cambiarPassword = async (req, res, next) => {
    const { token } = req.params

    const { password, repetirPassword } = req.body

    const existeUsuario = await Usuarios.findOne({ where: { token } })

    if (!existeUsuario) {
        res.status(404).json({ msg: "No se encontro ningun usuario." })
        return next()
    }

    if (password !== repetirPassword) {
        res.json({ msg: "Las contaseñas no coinciden." })
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const nuevoPassword = await bcrypt.hash(password, salt)
        existeUsuario.password = nuevoPassword;
        existeUsuario.token = null;
        await existeUsuario.save()
        res.json({ msg: "La contraseña fue cambiada satisfactoriamente." })
        return next();

    } catch (error) {
        const msgError = new Error(error)
        res.json({ msg: msgError.message })
        return
    }

}

const iniciarSession = async (req, res, next) => {
    const { password, email } = req.body

    const existeUsuario = await Usuarios.findOne({ where: { email } })

    if (!existeUsuario) {
        res.status(404).json({ msg: "No se encontro ningun registro con ese email." })
        return
    }

    if (!existeUsuario.confirmado) {
        res.status(403).json({ msg: "Debes confirmar tu cuenta para tener acceso." })
        return
    }

    if (!await existeUsuario.verificarPassword(password)) {
        res.status(403).json({ msg: "La contraseña no es correcta." })
        return
    }

    const JWT = generarJWT({ email, id: existeUsuario.id })

    res.cookie('token', JWT, {
        httpOnly: false,
        sameSite: 'lax'
    })

    res.json({
        usuario: {
            nombre: existeUsuario.nombre,
            apellido: existeUsuario.apellido
        }
    })

}

export {
    crearUsuario,
    cofirmarCuenta,
    olvidePassword,
    olvidePasswordVerificarToken,
    cambiarPassword,
    iniciarSession
}