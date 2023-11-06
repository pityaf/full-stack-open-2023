import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (city) => {
    //const end_point = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const end_point = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
    return axios
            .get(`${end_point}`)
            .then(response => response.data);
}

export default getWeather;