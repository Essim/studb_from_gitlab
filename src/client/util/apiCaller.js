import axios from 'axios';

export const API_URL = 'http://localhost:8888/api';

const callApi = (endpoint, method = 'get', data) =>
    axios({
        method,
        url: `/api/${endpoint}`,
        data,
    }).then((response) => response)
    .catch((error) => {
        if (error.response.status === 500) {
            // Traiter l'erreur 500
            console.log(error.response);
            return Promise.reject(error);
        } else {
            console.log(error);
            return Promise.reject(error);
        }
    });

export default callApi;