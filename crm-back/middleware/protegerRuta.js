import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config('.env')

import { Usuarios } from '../models/index.js';



const protegerRuta = async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        res.status(403).json({ msg: "No tienes acceso" })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECT)
        const usuario = await Usuarios.scope('eliminarAtributos').findByPk(decoded.id)

        if (usuario) {
            req.usuario = usuario
            return next()
        }

        if (!usuario) return

    } catch (error) {
        return res.clearCookie('token');
    }
}


export default protegerRuta