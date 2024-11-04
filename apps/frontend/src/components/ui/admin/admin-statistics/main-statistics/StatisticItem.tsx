import React, { FC } from 'react';
import CountUp from 'react-countup';

import { IStatisticItem } from '@/components/ui/admin/admin-statistics/main-statistics/statistics-item.interface';
import { getIcon } from '@/components/ui/admin/admin-statistics/main-statistics/statistics.util';
import Heading from '@/components/ui/heading/Heading';

import styles from './MainStatistics.module.scss';

const StatisticItem: FC<{ item: IStatisticItem }> = ({ item }) => {
	const Icon = getIcon(item.id);

	return (
		<div className={styles.item}>
			<div className={styles.header}>
				<p className={styles.name}>{item.name}</p>
				<Icon className={styles.icon} />
			</div>
			<Heading>
				<CountUp end={item.value} />
			</Heading>
		</div>
	);
};

export default StatisticItem;
