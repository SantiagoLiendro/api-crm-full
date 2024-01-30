import app from './app.js'
import db from './config/db.js'

try {
    await db.authenticate()
    db.sync()
    console.log("Conexio Base de Datos Correcta")

} catch (error) {
    console.error(error)
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Aplicaccion corriendo en el puerto ${PORT}`)
})


//Routing
