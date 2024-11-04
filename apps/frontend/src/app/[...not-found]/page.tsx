import { Metadata } from 'next';
import React from 'react';

import NotFound from '@/app/[...not-found]/NotFound';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: "Page isn't found",
	...NO_INDEX_PAGE,
};

const NotFoundPage = () => {
	return <NotFound />;
};

export default NotFoundPage;
