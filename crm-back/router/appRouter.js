import express from 'express';

import protegerRuta from '../middleware/protegerRuta.js';
import {
    inicio, perfil,
    editarPerfil, nuevoCliente,
    mostrarCliente, editarCliente,
    eliminarCliente
} from '../controllers/appControllers.js';


const router = express.Router();


router.get('/', protegerRuta, inicio)

router.route('/perfil')
    .get(protegerRuta, perfil)
    .put(protegerRuta, editarPerfil)

router.post('/nuevo_cliente', protegerRuta, nuevoCliente)

router.route('/cliente/:id')
    .get(protegerRuta, mostrarCliente)
    .put(protegerRuta, editarCliente)
    .delete(protegerRuta, eliminarCliente)










export default router