import { DataTypes } from 'sequelize'

import db from "../config/db.js";

const Clientes = db.define('clientes',
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
        },
        telefono: {
            type: DataTypes.STRING
        }

    }, {
    scopes: {
        eliminarUsuario: {
            attributes: {
                exclude: ['usuarioId']
            }
        }

    }
}


)

export default Clientes


