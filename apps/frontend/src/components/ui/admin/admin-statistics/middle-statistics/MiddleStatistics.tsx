'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { statisticsService } from '@/api/services/statistics/statistics.service';

import SalesChart from '@/components/ui/admin/admin-statistics/middle-statistics/sales-chart/SalesChart';
import SalesChartLoading from '@/components/ui/admin/admin-statistics/middle-statistics/sales-chart/SalesChartLoading';
import TopMovies from '@/components/ui/admin/admin-statistics/middle-statistics/top-movies/TopMovies';
import TopMoviesLoading from '@/components/ui/admin/admin-statistics/middle-statistics/top-movies/TopMoviesLoading';

import styles from './MiddleStatistics.module.scss';

const MiddleStatistics = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get middle statistics'],
		queryFn: () => statisticsService.getMiddle(),
	});

	if (isLoading)
		return (
			<div className={styles.wrapper}>
				<div className={styles.tom_moies}>
					<TopMoviesLoading />
				</div>
				<div className={styles.sales_chart}>
					<SalesChartLoading />
				</div>
			</div>
		);

	return (
		<div className={styles.wrapper}>
			{data ? (
				<>
					<div className={styles.tom_moies}>
						<TopMovies data={data.topMovies} />
					</div>
					<div className={styles.sales_chart}>
						<SalesChart data={data.salesByWeek} />
					</div>
				</>
			) : (
				<div>No data for statistics</div>
			)}
		</div>
	);
};

export default MiddleStatistics;
