import { Metadata } from 'next';
import React from 'react';

import Movies from '@/app/(main)/admin/movies/Movies';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'List of movies',
	...NO_INDEX_PAGE,
};

const MoviesPage = () => {
	return <Movies />;
};

export default MoviesPage;
