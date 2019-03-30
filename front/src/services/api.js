import axios from 'axios'

const port = 5000

const api = axios.create(
    {
        baseURL: `http://127.0.0.1:${port}/`
    }
)

export default api