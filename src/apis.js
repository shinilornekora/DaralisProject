import axios from 'axios'

const api = {
    character: {
        element: axios.get('http://localhost:8090/api/table/character/').catch((error) => error),
        add: (params) => axios.post('http://localhost:8090/api/table/character/add', params),
        delete: (params) => axios.post('api/table/character/delete', params),
        update: (params) => axios.post('api/table/character/update', params),
    },
    quest: {
        element: axios.get('http://localhost:8090/api/table/quest/').catch((error) => error),
        add: (params) => axios.post('api/table/quest/add', params),
        delete: (params) => axios.post('api/table/quest/delete', params),
        update: (params) => axios.post('api/table/quest/update', params),
    },
    location: {
        element: axios.get('http://localhost:8090/api/table/location/').catch((error) => error),
        add: (params) => axios.post('http://localhost:8090/api/table/location/add', params),
        delete: (params) => axios.post('http://localhost:8090/api/table/location/delete', params),
        update: (params) => axios.post('http://localhost:8090/api/table/location/update', params),
    },
    item: {
        element: axios.get('http://localhost:8090/api/table/item').catch((error) => error),
        add: (params) => axios.post('http://localhost:8090/api/table/item/add', params),
        delete: (params) => axios.post('http://localhost:8090/api/table/item/delete', params),
        update: (params) => axios.post('http://localhost:8090/api/table/item/update', params),
    },
}

export default api;