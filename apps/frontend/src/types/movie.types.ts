import { IActor } from '@/types/actor.types';
import { IGenre } from '@/types/genre.types';
import { IReview } from '@/types/review.types';

export interface IMovie {
	id: string;
	poster: string;
	bigPoster: string;
	title: string;
	description: string;
	year: number;
	slug: string;
	country: string;
	genres: IGenre[];
	actors: IActor[];
	reviews: IReview[];
	views: number;
	videoUrls: string[];
}

export interface IMovieEditInput
	extends Omit<IMovie, 'id' | 'views' | 'reviews' | 'genres' | 'actors'> {
	genres: string[];
	actors: string[];
}
