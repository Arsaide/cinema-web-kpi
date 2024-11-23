import { Metadata } from 'next';
import React from 'react';

import Genres from '@/app/(main)/admin/genres/Genres';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'List of genres',
	...NO_INDEX_PAGE,
};

const GenresPage = () => {
	return <Genres />;
};

export default GenresPage;
