import router from "../router/usuarioRouter.js";
import jest from 'jest'
import app from "../app.js";
import request from "supertest";


describe('GET /confirmar_cuenta', () => {
    test('Deberia Responder 404', async () => {
        const respuesta = await request(app).get('/confirmar_cuenta/5rlmm7p48h1hgthv0h3').send();
        expect(respuesta.statusCode).toBe(403)
    })
})

describe('GET /cambiar_password', () => {
    test('Deberia Responder 200', async () => {
        const respuest = await request(app).get('/cambiar_password/asdfkkñla').send()
        expect(respuest.statusCode).toBe(404)
    })
})

describe('POST /crear_usuario', () => {
    test('Creando nuevo usuario', async () => {
        const respuesta = await request(app).post('/crear_usuario')
            .send({
                nombre: "Pablo",
                apellido: "Liendro",
                email: "correo@correo.com",
                password: "psml1998"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)

        expect(respuesta.statusCode).toBe(402)

    })
})
let token = ''

describe('POST /iniciar_sesion', () => {
    test('Iniciando Sesion', async () => {
        const respuesta = await request(app).post('/iniciar_sesion')
            .send({ email: "correo@correo.com", password: "psml1998" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(respuesta.statusCode).toBe(200)
        token = respuesta.headers['set-cookie']

    })
})

describe('GET /inicio', () => {
    test('Inicio', async () => {
        const respuesta = await request(app).get('/inicio')
            .set('Cookie', token[0])

        expect(respuesta.statusCode).toBe(200)
    })
})

describe('GET /perfil', () => {
    test('Inicio', async () => {
        const respuesta = await request(app).get('/inicio/perfil')
            .set('Cookie', token[0])
        expect(respuesta.statusCode).toBe(200)
    })
})

// describe('POST /inicio/nuevo_cliente', () => {
//     test('Crear Nuevo Cliente', async () => {
//         const response = await request(app).post('/inicio/nuevo_cliente')
//             .set('Cookie', token[0])
//             .send({
//                 nombre: "Cliente Test",
//                 descripcion: "Descripcion Cliente Test",
//                 email: "cliente@cliente.com",
//                 telefono: "1233213"
//             })
//         expect(response.statusCode).toBe(200)
//     })
// })


describe('GET /inicio/cliente', () => {
    test('Mostrar Usuario Por ID', async () => {
        const response = await request(app).get('/inicio/cliente/4')
            .set('Cookie', token[0])

        expect(response.statusCode).toBe(200)
    })
})

describe('PUT /inicio/cliente', () => {
    test('Editar Cliente por ID', async () => {
        const response = await request(app).put('/inicio/cliente/4')
            .set('Cookie', token[0])
            .send({
                nombre: "Nombre Actualizado"
            })

        expect(response.statusCode).toBe(200)
    })
})

describe('DELETE /inicio/cliente', () => {
    test('Eliminar registro por ID', async () => {
        const response = await request(app).delete('/inicio/cliente/7')
            .set('Cookie', token[0])

        expect(response.statusCode).toBe(404)
    })
})