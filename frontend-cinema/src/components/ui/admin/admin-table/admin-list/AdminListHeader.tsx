import cn from 'clsx';
import React, { FC } from 'react';

import styles from './AdminList.module.scss';

interface IAdminListHeader {
	headerItems: string[];
}

const AdminListHeader: FC<IAdminListHeader> = ({ headerItems }) => {
	return (
		<div className={cn(styles.item, styles.item_header)}>
			{headerItems.map(value => (
				<div key={value}>{value}</div>
			))}

			<div>Actions</div>
		</div>
	);
};

export default AdminListHeader;
