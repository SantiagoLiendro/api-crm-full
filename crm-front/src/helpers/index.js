export const formatearFecha = (fecha) => {
    return fecha = new Date().toLocaleDateString('es-ar', { weekday: "short", year: "numeric", month: "short", day: "numeric" })
}