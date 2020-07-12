import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";


const Details = (props) => {
    let apiKey = process.env.REACT_APP_STACK_API_KEY;
    let baseURL = `http://api.weatherstack.com/current?access_key=${apiKey}&query=`;
    const [weatherDetails, setWeatherDetails] = useState(null);

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

    useEffect(() => {
        getWeather()
    }, [])

    useEffect(() => {
        console.log(weatherDetails)
    }, [weatherDetails])
    return (
        <div className='details-container'>
            <div>
                <h1> Weather info for <span>{weatherDetails?.results?.location?.name}, {weatherDetails?.results?.location?.country}</span></h1>
                <Link to='/' className='go-home'>Go Home</Link>
                <div className='row'>
                    <div className='col-md-4'>
                        {/* <div>svg</div> */}
                        <h3>Temperature</h3>
                        <div>{weatherDetails?.results?.current?.temperature} &#176;</div>
                    </div>
                    <div className='col-md-4'>
                        <h3>Timezone</h3>
                        <div>{weatherDetails?.results?.location?.timezone_id}</div>
                        <br />
                        <h3>Local Time</h3>
                        <div>{weatherDetails?.results?.location?.localtime}</div>
                    </div>
                    <div className='col-md-4'>
                        <h3>Wind Speed</h3>
                        <div>{weatherDetails?.results?.current?.wind_speed} kmph </div>
                        <br />
                        <h3>Wind Direction</h3>
                        <div>{weatherDetails?.results?.current?.wind_degree}  {weatherDetails?.results?.current?.wind_dir}</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <h3>Pressure</h3>
                        <div>{weatherDetails?.results?.current?.pressure} Millbar</div>
                    </div>
                    <div className='col-md-4'>
                        <h3>Humidity</h3>
                        <div>{weatherDetails?.results?.current?.humidity} %</div>
                    </div>
                    <div className='col-md-4'>
                        <h3>Cloud Cover</h3>
                        <div>{weatherDetails?.results?.current?.cloudcover} %</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Details
