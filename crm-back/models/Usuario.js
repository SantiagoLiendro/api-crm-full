import { DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from 'bcrypt'

const Usuarios = db.define('usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    hooks: {
        beforeCreate: async function (usuario) {
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(usuario.password, salt)
        }
    },
    scopes: {
        eliminarPassword: {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            },
        },
        eliminarAtributos: {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'token', 'confirmado']
            }
        }
    }
}
)

Usuarios.prototype.verificarPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}


export default Usuarios;
