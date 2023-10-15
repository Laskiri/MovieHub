import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import Movie from "./MovieCard";

// http://www.omdbapi.com/?i=tt3896198&apikey=c867f993

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=c867f993";





const App = () => {
    let lastSearched =""
    const searchMovies = async (searchTerm) => {
    
        const response = await fetch(`${API_URL}&s=${searchTerm}`);
        const data = await response.json();
        data.Response === 'True' ? setMovies(data.Search) : setMovies([]);
        setLastSearch(searchTerm);
    }
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [lastSearch, setLastSearch] = useState('')

    useEffect(() => {
        searchMovies("Matrix");}, []
    )
    return (
        <div className ="app">
            <h1>MoviesCentral</h1>
            <div className = "search">
                <input placeholder = "Search after any movie" value = {searchTerm} onChange = {(e) => {setSearchTerm(e.target.value)}} />
                <img src={SearchIcon} alt="search" onClick ={() => {searchMovies(searchTerm)} }/>
            </div>
            {<h2>{`Showing ${movies.length} search results for "${lastSearch}"`}</h2>}
            {movies.length > 0 ? 
            <div className="container">
                {movies.map((movie) => (
                    <Movie movie={movie}/>
                ))}
            </div> : <h2>No movies found</h2>}
            
        </div>

        
    );
}

export default App;