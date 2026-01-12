import React from 'react'
import { FeaturedMovie } from '@/app/components/featured-movie'
import { Movie } from "@/app/types";

function MovieContainer({ movie, isCompact }: { movie?: Movie; isCompact?: boolean }) {
    console.log('Movie Details:', movie);
    return (
        <div>
            <FeaturedMovie movie={movie} isCompact={isCompact} />
        </div>
    )
}

export default MovieContainer