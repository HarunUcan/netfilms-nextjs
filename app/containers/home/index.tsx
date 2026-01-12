import React from 'react'
import { FeaturedMovie } from '@/app/components/featured-movie';
import { Categories } from '@/app/components/categories';
import { MoviesSection } from '@/app/components/movies-section';
import { Movie } from '@/app/types';
import { Genre } from '@/app/types';
import { GetPopularMovies } from '@/app/[[...category]]/page';

async function HomeContainer({ selectedCategory }: { selectedCategory: { id: string | null, movies: Movie[] } }) {
    const [PopularMovies, TopRatedMovies, UpcomingMovies, Genres] = await Promise.all([
        GetPopularMovies(1),
        getTopRatedMovies(1),
        getUpcomingMovies(1),
        getGenres()
    ]);
    return (
        <div>
            <FeaturedMovie movie={selectedCategory.movies ? selectedCategory.movies[0] : PopularMovies.results[0]} />
            <Categories categories={Genres.genres.slice(0, 5)} />
            {
                selectedCategory.id &&
                selectedCategory.movies.length > 0 &&
                <MoviesSection title={Genres.genres.find(g => g.id === parseInt(selectedCategory.id!))?.name || "Category Films"} movies={selectedCategory.movies} />
            }

            <MoviesSection title="Popular Movies" movies={PopularMovies.results.slice(0, 6)} />
            <MoviesSection title="Top Rated Movies" movies={TopRatedMovies.results.slice(0, 6)} />
            <MoviesSection title="Upcoming Movies" movies={UpcomingMovies.results.slice(0, 6)} />
        </div>
    )
}
export default HomeContainer

async function getGenres(): Promise<{ genres: Genre[] }> {
    const genresResponse = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN!}`,
            'accept': 'application/json'
        }
    });
    const genresData = await genresResponse.json();
    return genresData;
}

async function getTopRatedMovies(page: number = 1): Promise<{ results: Movie[] }> {
    const moviesResponse = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN!}`,
            'accept': 'application/json'
        }
    });
    const moviesData = await moviesResponse.json();
    return moviesData;
}

async function getUpcomingMovies(page: number = 1): Promise<{ results: Movie[] }> {
    const moviesResponse = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN!}`,
            'accept': 'application/json'
        }
    });
    const moviesData = await moviesResponse.json();
    return moviesData;
}

/*
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1' \
     --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzVkOWRlZDJjNTdlNTQ4MTVlZmU4OWZjMmRjYzkyMCIsIm5iZiI6MTc2NTc1OTUzNy43MTUwMDAyLCJzdWIiOiI2OTNmNWEzMWJlMmIyYzYyMzc4M2VjMDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iWrtJ_Wn7zBytrsGvdAwSfzqKSjfde7h5FxAXl0EQQU' \
     --header 'accept: application/json'

curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1' \
     --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzVkOWRlZDJjNTdlNTQ4MTVlZmU4OWZjMmRjYzkyMCIsIm5iZiI6MTc2NTc1OTUzNy43MTUwMDAyLCJzdWIiOiI2OTNmNWEzMWJlMmIyYzYyMzc4M2VjMDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iWrtJ_Wn7zBytrsGvdAwSfzqKSjfde7h5FxAXl0EQQU' \
     --header 'accept: application/json'
*/