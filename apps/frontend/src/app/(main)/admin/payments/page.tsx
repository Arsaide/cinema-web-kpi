import { Metadata } from 'next';
import React from 'react';

import Payments from '@/app/(main)/admin/payments/Payments';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'List of payments',
	...NO_INDEX_PAGE,
};

const PaymentsPage = () => {
	return <Payments />;
};

export default PaymentsPage;
