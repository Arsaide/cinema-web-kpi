import React, { FC } from 'react';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import AdminListHeader from '@/components/ui/admin/admin-table/admin-list/AdminListHeader';
import AdminListItem from '@/components/ui/admin/admin-table/admin-list/AdminListItem';
import { ITableItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface';

import styles from './AdminList.module.scss';

interface IAdminList {
	listItems: ITableItem[];
	headerItems: string[];
	isLoading: boolean;
	removeHandler?: (id: string) => void;
	cancelHandler?: (id: string) => void;
}

const AdminList: FC<IAdminList> = ({
	listItems,
	headerItems,
	isLoading,
	removeHandler,
	cancelHandler,
}) => {
	return (
		<div className={'mb-12'}>
			<AdminListHeader headerItems={headerItems} />

			{isLoading ? (
				<div className={styles.loading}>
					{Array.from({ length: 5 }).map((_, i) => (
						<SkeletonLoader key={i} className={'h-11'} />
					))}
				</div>
			) : listItems.length ? (
				listItems.map(item => (
					<AdminListItem
						key={item.id}
						listItem={item}
						removeHandler={removeHandler ? () => removeHandler(item.id) : undefined}
						cancelHandler={cancelHandler ? () => cancelHandler(item.id) : undefined}
					/>
				))
			) : (
				<div className={styles.not_found}>Elements not found</div>
			)}
		</div>
	);
};

export default AdminList;
