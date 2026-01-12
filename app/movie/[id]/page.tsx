import React from 'react'
import MovieContainer from '@/app/containers/movie'
import Movies from '@/app/mocks/movies.json'
import { notFound } from 'next/navigation';
import { Movie } from '@/app/types';

async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log('Movie ID from params:', id);
    const movieDetails = await getMovieDetails(id);

    if (!movieDetails) {
        notFound();
    }

    return (
        <MovieContainer movie={movieDetails} isCompact={false} />
    )
}

export default MoviePage

async function getMovieDetails(id: string): Promise<Movie> {
    const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN!}`,
            'accept': 'application/json'
        }
    });
    const movieData = await movieResponse.json();
    return movieData;
}

/*
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/movie_id?language=en-US' \
     --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzVkOWRlZDJjNTdlNTQ4MTVlZmU4OWZjMmRjYzkyMCIsIm5iZiI6MTc2NTc1OTUzNy43MTUwMDAyLCJzdWIiOiI2OTNmNWEzMWJlMmIyYzYyMzc4M2VjMDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iWrtJ_Wn7zBytrsGvdAwSfzqKSjfde7h5FxAXl0EQQU' \
     --header 'accept: application/json'
*/