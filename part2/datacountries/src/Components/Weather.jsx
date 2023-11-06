import { useState, useEffect } from "react";
import getWeather from "../services/weather";

const Weather = ({ capital }) => {

    const [cityWeather, setcityWeather] = useState(null);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        getWeather(capital)
            .then(response => {
                setcityWeather(response);
            })
    }, [capital]);

    if(cityWeather === null) return <></>

    return(
        <div style={{ paddingLeft: 20, paddingRight: 20 , borderRadius: '0% 15% 15% 0%', backgroundColor: '#CDCDCD' }}>
            <h2>Weather in { capital }</h2>
            <p>{ capitalizeFirstLetter(cityWeather.weather[0].description) } | { cityWeather.main.temp } °C</p>
            <p>Wind - { cityWeather.wind.speed } m/s</p>
            <img src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`} alt="weather forecast icon" />
        </div>
    )

}

export default Weather;