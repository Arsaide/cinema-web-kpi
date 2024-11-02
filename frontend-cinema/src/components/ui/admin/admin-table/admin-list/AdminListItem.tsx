import React, { FC } from 'react';

import AdminActions from '@/components/ui/admin/admin-table/admin-list/admin-actions/AdminActions';
import { IAdminListItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface';

import styles from './AdminList.module.scss';

const AdminListItem: FC<IAdminListItem> = ({ listItem, removeHandler }) => {
	return (
		<div className={styles.item}>
			{listItem.items.map(value => (
				<div key={value}>{value}</div>
			))}

			<AdminActions
				viewUrl={listItem.viewUrl}
				editUrl={listItem.editUrl}
				removeHandler={removeHandler}
			/>
		</div>
	);
};

export default AdminListItem;
