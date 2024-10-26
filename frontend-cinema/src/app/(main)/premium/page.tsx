import { Metadata } from 'next';
import React from 'react';

import Premium from '@/app/(main)/premium/Premium';

export const metadata: Metadata = {
	title: 'Premium subscribe!',
};

const PremiumPage = () => {
	return <Premium />;
};

export default PremiumPage;
