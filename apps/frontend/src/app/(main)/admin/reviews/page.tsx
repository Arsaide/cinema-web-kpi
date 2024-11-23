import { Metadata } from 'next';
import React from 'react';

import Reviews from '@/app/(main)/admin/reviews/Reviews';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'List of reviews',
	...NO_INDEX_PAGE,
};

const ReviewsPage = () => {
	return <Reviews />;
};

export default ReviewsPage;
