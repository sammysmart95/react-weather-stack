import React from 'react'

const Search = ({ searchValue, handleSearch, getWeather }) => {
    return (
        <div className='searchBar'>
            <input
                type='text'
                placeholder='Enter city name...'
                value={searchValue}
                onChange={handleSearch}
                onKeyPress={getWeather}
            />
        </div>
    )
}

export default Search
