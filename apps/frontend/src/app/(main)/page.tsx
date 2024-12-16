import { Metadata } from 'next';
import React from 'react';

import { movieService } from '@/api/services/movie/movie.service';

import Home from '@/app/(main)/Home';

import { ISlide } from '@/components/ui/slider/slider.interface';

import { PUBLIC_URL } from '@/config/url.config';

import { getGenresList } from '@/utils/movie/getGenresList';

export const metadata: Metadata = {
	title: 'Watch movies',
};

export const revalidate = 60;

async function getContent() {
	const movies = await movieService.getAll();

	const slides: ISlide[] = movies
		.map(movie => ({
			id: movie.id,
			link: PUBLIC_URL.movie(movie.slug),
			subTitle: getGenresList(movie.genres),
			title: movie.title,
			bigPoster: movie.bigPoster,
		}))
		.slice(0, 4);

	return { slides };
}

const HomePage = async () => {
	const { slides } = await getContent();

	return <Home slides={slides} />;
};

export default HomePage;
