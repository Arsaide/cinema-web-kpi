import { Metadata } from 'next';
import React from 'react';

import MovieEdit from '@/app/(main)/admin/movies/[id]/MovieEdit';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { IPageIdParam } from '@/types/page.params.types';

export const metadata: Metadata = {
	title: 'Movie settings',
	...NO_INDEX_PAGE,
};

const MovieEditPage = ({ params }: IPageIdParam) => {
	return <MovieEdit movieId={params.id} />;
};

export default MovieEditPage;
