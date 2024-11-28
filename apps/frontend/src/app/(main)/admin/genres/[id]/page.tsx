import { Metadata } from 'next';
import React from 'react';

import GenreEdit from '@/app/(main)/admin/genres/[id]/GenreEdit';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { IPageIdParam } from '@/types/page.params.types';

export const metadata: Metadata = {
	title: 'Genre settings',
	...NO_INDEX_PAGE,
};

const GenreEditPage = ({ params }: IPageIdParam) => {
	return <GenreEdit genreId={params.id} />;
};

export default GenreEditPage;
