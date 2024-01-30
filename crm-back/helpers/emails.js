import nodemailer from 'nodemailer'
import dotenv from 'dotenv'


dotenv.config('.env')


const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


const confirmarCuenta = async (datos) => {
    const { nombre, apellido, email, token } = datos

    await transport.sendMail({
        from: 'CRM-Practica',
        to: email,
        subject: "Confirma tu cuenta",
        text: "Confirma tu Cuenta",
        html: `
            <p>Hola ${nombre} ${apellido}, confirma tu cuenta para iniciar sesion.</p>
            <p>Haz Click en el siguiente <a href="${process.env.URL_FRON}/confirmar-cuenta/${token}">enlace</a> para confirmar tu cuenta.</p>
            <p>Si no creaste una cuenta recientemente, ignora este mensaje.</p>
        `
    })
}

const mailOlvidePassword = async (datos) => {
    const { nombre, apellido, email, token } = datos

    await transport.sendMail({
        from: 'CRM-Practica',
        to: email,
        subject: "Confirma tu cuenta",
        text: "Confirma tu Cuenta",
        html: `
            <p>Hola ${nombre} ${apellido}.</p>
            <p>Haz Click en el siguiente <a href="${process.env.URL_BACK}/cambiar_password/${token}">enlace</a> para recuperar tu cuenta.</p>
            <p>Si no solicitaste un cambio de contraseña, ignora este mensaje.</p>
        `
    })
}




export {
    confirmarCuenta,
    mailOlvidePassword
}