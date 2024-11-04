import React from 'react';

import Loader from '@/components/ui/Loader';
import styles from '@/components/ui/admin/admin-statistics/middle-statistics/top-movies/TopMovies.module.scss';

const SalesChartLoading = () => {
	return (
		<div className={styles.sales_chart}>
			<div className={'h-[390px] w-full flex items-center justify-center'}>
				<Loader />
			</div>
		</div>
	);
};

export default SalesChartLoading;
