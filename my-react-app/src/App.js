import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import Movie from "./MovieCard";
import LoadMoreButton from "./LoadMoreButton";


const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=c867f993";




const App = () => {
    const searchMovies = async (searchTerm) => {
        searchTerm === '' && (searchTerm = ' ');
        const response = await fetch(`${API_URL}&s=${searchTerm}&page=0}`);
        const data = await response.json();
        console.log(data);
        {data.Response === 'True' ? (
            <>
              {setMovies(data.Search)}
              {setTotalResults(data.totalResults)}
            </>
          ) : (
            <>
              {setMovies([])}
              {setTotalResults(0)}
            </>
          )}
        setLastSearch(searchTerm);
    }

    const getMoreMovies = async (lastSearched, movies, pageNumber) => { 
        const response = await fetch(`${API_URL}&s=${lastSearched}&page=${pageNumber}`);
        const data = await response.json();
        console.log(data);
        data.Response === 'True' && setMovies(movies.concat(data.Search)); 
        setPage(pageNumber); 

    }// 
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [lastSearch, setLastSearch] = useState('');
    const [page, setPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [loadMore, setLoadMore] = useState(false);
    const [validSearch, setValidSearch] = useState(true);
   

    useEffect(() => {setPage(1);
        searchMovies("Spiderman");}, []
    )

    useEffect(() => {setLoadMore(movies.length < totalResults)}, [movies, totalResults])

    useEffect(() => {setValidSearch(totalResults > 0)}, [totalResults])
    


    return (
        <div className ="app">
            <h1>MovieHub</h1>
            <div className = "search">
                <input placeholder = "Search after any movie" value = {searchTerm} onChange = {(e) => {setSearchTerm(e.target.value)}} 
                     onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault(); 
                          setPage(1);
                          searchMovies(searchTerm);
                        }
                      }}
                />
                <img src={SearchIcon} alt="search" onClick ={() => {setPage(1); searchMovies(searchTerm)} }/>
            </div>
            {<h2>{`We found ${totalResults} matches for: "${lastSearch}"`}</h2>}
            {movies.length > 0 && 
            <div className="container">
                {movies.map((movie) => (
                    <Movie movie={movie}/>
                ))}
            </div> }
           
            {validSearch ? <div>         
            {
                loadMore ? <LoadMoreButton onClick={() => {
                    getMoreMovies(lastSearch, movies, page + 1);
                 }} /> : <h2>No more movies to load</h2> 
            }  </div> : <h2>Try searching for another movie!</h2>}
        </div>

        
    );
}

export default App;