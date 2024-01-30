import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config('.env')

const generarId = () => Math.random().toString(32).substring(2) + Date.now().toString(32);

const generarJWT = (datos) => jwt.sign({ id: datos.id, email: datos.email }, process.env.JWT_SECT, { expiresIn: '20d' })

export {
    generarId,
    generarJWT
}