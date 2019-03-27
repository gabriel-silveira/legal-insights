import axios from 'axios'

const api = axios.create(
    {
        baseURL: 'http://127.0.0.1:8888/api/'
    }
)

export default api