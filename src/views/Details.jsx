import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import Icons from '../assets/svg/Icons'


const Details = (props) => {
    // My api key and the api base url
    let apiKey = process.env.REACT_APP_STACK_API_KEY;
    let baseURL = `http://api.weatherstack.com/current?access_key=${apiKey}&query=`;
    const [weatherDetails, setWeatherDetails] = useState(null);


    // This function  get the current weather of the searched location and render the details for the weather
    const getWeather = () => {
        axios
            .get(baseURL + props.match.params.location)
            .then(({ data }) => {
                let results = data;
                setWeatherDetails((prevState) => {
                    return {
                        ...prevState,
                        results,
                    };
                });
            })
            .catch((err) => {
                //  window.alert("City can not be found!");
                console.warn(err);
            });
    };

    // This render the details component once the details button is clicked....
    useEffect(() => {
        getWeather()
    }, [])


    return (
        <div className='details-container'>
            <div>
                <h1> Weather info for <span>{weatherDetails?.results?.location?.name}, {weatherDetails?.results?.location?.country}</span></h1>
                <Link to='/' className='go-home'>Go Home</Link>
                <div className='row details'>
                    <div className='col-md-4 col-lg-4 '>
                        <div className='details-content '>
                            <div className='single'>  <Icons.Temperature /></div>
                            <h3>Temperature</h3>
                            <div className='text'>
                                {weatherDetails?.results?.current?.temperature}&#176;</div>
                        </div>
                    </div>
                    <div className='col-md-4 '>
                        <div className='details-content'>
                            <Icons.Time />
                            <h3>Timezone</h3>
                            <div className='text'>{weatherDetails?.results?.location?.timezone_id}</div>
                            <h3>Local Time</h3>
                            <div className='text'>{weatherDetails?.results?.location?.localtime}</div>
                        </div>
                    </div>
                    <div className='col-md-4 '>
                        <div className='details-content'>
                            <Icons.Wind />
                            <h3>Wind Speed</h3>
                            <div className='text'>{weatherDetails?.results?.current?.wind_speed} kmph </div>
                            <h3>Wind Direction</h3>
                            <div className='text'>{weatherDetails?.results?.current?.wind_degree}  {weatherDetails?.results?.current?.wind_dir}</div>
                        </div>
                    </div>
                </div>
                <div className='row details'>
                    <div className='col-md-4 '>
                        <div className='details-content'>
                            <div className='single'><Icons.Pressure /></div>
                            <h3>Pressure</h3>
                            <div>{weatherDetails?.results?.current?.pressure} Millbar</div>
                        </div>
                    </div>
                    <div className='col-md-4 '>
                        <div className='details-content'>
                            <div className='single'><Icons.Humidity /></div>
                            <h3>Humidity</h3>
                            <div className='text'>{weatherDetails?.results?.current?.humidity}%</div>
                        </div>
                    </div>
                    <div className='col-md-4 '>
                        <div className='details-content'>
                            <div className='single'> <Icons.Weather /></div>
                            <h3>Cloud Cover</h3>
                            <div className='text'>{weatherDetails?.results?.current?.cloudcover}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
