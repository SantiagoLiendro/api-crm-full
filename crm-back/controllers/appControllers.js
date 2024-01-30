import Clientes from "../models/Cliente.js"
import { Usuarios } from "../models/index.js"



const inicio = async (req, res, next) => {
    const { id: usuarioId } = req.usuario
    const clientes = await Clientes.findAll({ where: { usuarioId }, include: [{ model: Usuarios.scope('eliminarAtributos') }] })

    res.status(200).json({ clientes, usuario: req.usuario })
}


const perfil = async (req, res, next) => {
    res.status(200).json(req.usuario)
}


const editarPerfil = async (req, res, next) => {
    const { id } = req.usuario
    const { nombre, apellido, email, password } = req.body

    const usuario = await Usuarios.findByPk(id)

    if (!password) {
        res.status(403).json({ msg: "La contraseña es obligatoria." })
        return
    }

    if (!await usuario.verificarPassword(password)) {
        res.status(403).json({ msg: "La contraseña no es correcta." })
        return
    }


    try {
        usuario.set({
            nombre: nombre || usuario.nombre,
            apellido: apellido || usuario.apellido,
            email: email || usuario.email
        })
        await usuario.save()
        res.status(200).json({ msg: "Los cambios fueron guardados correctamente." })

    } catch (error) {
        const msgError = new Error(error)
        res.json({ msg: msgError.message })
        return
    }
}

const nuevoCliente = async (req, res) => {
    const { nombre, descripcion } = req.body
    const { id: usuarioId } = req.usuario

    if ([nombre, descripcion].includes('')) {
        res.status(403).json({ msg: "El nombre y la descripcion son obligatorios." })
        return
    }

    try {
        const cliente = await Clientes.create({ ...req.body, usuarioId })
        res.status(200).json({ msg: "Cliente guardado correctamente.", cliente })
        return;

    } catch (error) {
        const msgError = new Error(error)
        res.json({ msg: msgError.message })
        return
    }

}

const mostrarCliente = async (req, res) => {
    const { id } = req.params
    const { id: usuarioId } = req.usuario


    try {
        const cliente = await Clientes.scope('eliminarUsuario').findOne({ where: { id, usuarioId } })
        if (!cliente) {
            res.status(404).json({ msg: "Cliente no encontrado," })
            return
        }

        res.status(200).json(cliente)


    } catch (error) {
        const msgError = new Error(error)
        res.json({ msg: msgError.message })
        return
    }

}

const editarCliente = async (req, res) => {
    const { id } = req.params
    const { id: usuarioId } = req.usuario
    const { nombre, descripcion, email, telefono } = req.body


    const cliente = await Clientes.scope('eliminarUsuario').findOne({ where: { id, usuarioId } })
    if (!cliente) {
        res.status(404).json({ msg: "Cliente no encontrado," })
        return
    }


    try {
        cliente.set({
            nombre: nombre || cliente.nombre,
            descripcion: descripcion || cliente.descripcion,
            telefono: telefono || cliente.telefono,
            email: email || cliente.email
        })

        await cliente.save()

        res.status(200).json({ msg: "Cambios Guardados.", cliente })
        return

    } catch (error) {
        const msgError = new Error(error)
        res.json({ msg: msgError.message })
        return
    }

}

const eliminarCliente = async (req, res) => {
    const { id } = req.params
    const { id: usuarioId } = req.usuario

    const cliente = await Clientes.findOne({ where: { id, usuarioId } })

    if (!cliente) {
        res.status(404).json({ msg: "No se encuenta ningun registro." })
        return;
    }


    try {
        await cliente.destroy()
        res.json({ msg: "Registro eliminado." })

    } catch (error) {
        const msgErrro = new Error(error)
        res.json({ msg: msgErrro.message })
        return
    }
}


export {
    inicio,
    perfil,
    editarPerfil,
    nuevoCliente,
    mostrarCliente,
    editarCliente,
    eliminarCliente
}