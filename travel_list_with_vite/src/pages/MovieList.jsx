import { useState, useEffect } from "react";
import axios from 'axios';

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2VlNmY1NTMwMzlhMjNmZjVlNTI3ZmQzNWVhMjU2MiIsIm5iZiI6MTczMDE3MDg5My4yNzUsInN1YiI6IjY3MjA1MDBkYTRhYzhhNDMyYzVjZTkxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7MctydiaN_vIj_smFM1Jt4UKIV4GAbcifuAl_x5rCvA'
            }
        };

        axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => {
                const newMovies = [];
                for (const movie of response.data.results) {
                    newMovies.push(movie.title)
                }
                setMovies(newMovies);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>MovieList</h1>
            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>
                        {movie}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;