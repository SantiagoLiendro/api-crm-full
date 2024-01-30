import Usuarios from "./Usuario.js";
import Clientes from './Cliente.js'


Clientes.belongsTo(Usuarios)



export {
    Usuarios,
    Clientes
}