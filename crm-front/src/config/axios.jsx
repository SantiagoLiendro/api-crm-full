import axios from 'axios'

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL
})
clienteAxios.defaults.withCredentials = true

export default clienteAxios