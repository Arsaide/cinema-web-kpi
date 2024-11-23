import { Metadata } from 'next';
import React from 'react';

import Actors from '@/app/(main)/admin/actors/Actors';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'List of actors',
	...NO_INDEX_PAGE,
};

const ActorsPage = () => {
	return <Actors />;
};

export default ActorsPage;
