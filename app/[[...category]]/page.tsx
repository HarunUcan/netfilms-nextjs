import Image from "next/image";
import styles from "./page.module.css";
import HomeContainer from "@/app/containers/home";
import { resolve } from "path";
import { Movie } from "../types";

export default async function HomePage({ params }: { params: Promise<{ category?: string[] }> }) {

    const Movies = await GetPopularMovies(1);

    const resolvedParams = await params;
    const { category } = resolvedParams;
    let selectedCategory: Boolean = false;

    if (category && category.length > 0) {
        selectedCategory = true;
    }
    return (
        <HomeContainer selectedCategory={{
            id: resolvedParams.category ? resolvedParams.category[0] : null,
            movies: selectedCategory ? Movies.results.filter(movie => movie.genre_ids.includes(parseInt(resolvedParams.category![0]))) : Movies.results
        }} />
    );
}

export async function GetPopularMovies(page: number = 1): Promise<{ results: Movie[] }> {
    const moviesResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, {
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
*/
