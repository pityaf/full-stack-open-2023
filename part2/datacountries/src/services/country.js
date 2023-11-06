import axios from "axios";

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/';
const allEndPoint = 'api/all';
const contryEndPoint = 'api/name/'; // -> /api/name/{name}

const getAllCountry = () => {
    return axios
            .get(`${baseURL}${allEndPoint}`)
            .then(response => response.data);
}

const getCountry = (name) => {
    return axios
            .get(`${baseURL}${contryEndPoint}${name}`)
            .then(response => response.data);
}

export default { 
    getAllCountry,
    getCountry,
}