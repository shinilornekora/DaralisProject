import axios from 'axios'
const BASE_URL = 'http://192.168.0.108:8090'
const api = {
    table: {
        element: (table) => axios.get(`${BASE_URL}/api/table/${table}/`).catch((error) => error),
        add: (table, params) => axios.post(`${BASE_URL}/api/table/${table}/add`, params),
        delete: (table, params) => axios.delete(`${BASE_URL}/api/table/${table}/delete`, {
            headers: {
                "code": "OK",
            },
            data: params
        }),
        update: (table, params) => axios.put(`${BASE_URL}/api/table/${table}/update`, {
            headers: {
                "code": "OK",
            },
            data: params
        }),
    },
}

export default api;