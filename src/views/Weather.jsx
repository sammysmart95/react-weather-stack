import React, { useEffect } from 'react'
import Animate from '../components/Animate'
import { Link } from 'react-router-dom'

const Weather = ({ currentWeather }) => {
    useEffect(() => {
        console.log(currentWeather);
    }, [currentWeather]);
    return (
        <div className='weather-container'>
            <h1>{currentWeather?.results?.location?.name}</h1>
            <div className='weather-condition'>
                <div><img src={currentWeather?.results?.current?.weather_icons[0]} alt='' /></div>
                <div className='condition'>
                    {currentWeather?.results?.current?.weather_descriptions[0]}
                </div>
            </div>
            <div className='temperature'>
                <div className='temp'>
                    <Animate value={currentWeather?.results?.current?.temperature} />&#176;
                </div >
                <div className='feelslike'>
                    <Animate value={currentWeather?.results?.current?.feelslike} />
                    &#176;</div>
            </div>
            <Link to={`/details/${currentWeather?.results?.location?.name}`}>
                <button >Details</button>
            </Link>
        </div>
    )
}

export default Weather
