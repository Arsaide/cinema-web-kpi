'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { statisticsService } from '@/api/services/statistics/statistics.service';

import StatisticItem from '@/components/ui/admin/admin-statistics/main-statistics/StatisticItem';
import StatisticItemLoading from '@/components/ui/admin/admin-statistics/main-statistics/StatisticItemLoading';
import Heading from '@/components/ui/heading/Heading';

import styles from './MainStatistics.module.scss';

const MainStatistics = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get main statistics'],
		queryFn: () => statisticsService.getMain(),
	});

	return (
		<div>
			<Heading>Statistic</Heading>

			<div className={styles.main_statistics}>
				{isLoading ? (
					Array.from({ length: 4 }).map((_, index) => <StatisticItemLoading key={index} />)
				) : data ? (
					data.map(item => <StatisticItem key={item.id} item={item} />)
				) : (
					<div>No data for statistics</div>
				)}
			</div>
		</div>
	);
};

export default MainStatistics;
