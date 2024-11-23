'use client';

import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import { Icon } from '@/components/ui/Icon';
import { ITableItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface';

import styles from './AdminActions.module.scss';

interface IAdminActions extends Pick<ITableItem, 'editUrl' | 'viewUrl'> {
	removeHandler?: () => void;
	cancelHandler?: () => void;
}

const AdminActions: FC<IAdminActions> = ({ editUrl, viewUrl, removeHandler, cancelHandler }) => {
	const { push } = useRouter();

	return (
		<div className={styles.actions}>
			{viewUrl && (
				<button onClick={() => push(viewUrl)}>
					<Icon name={'LuExternalLink'} />
				</button>
			)}
			{editUrl && (
				<button onClick={() => push(editUrl)}>
					<Icon name={'LuPencil'} />
				</button>
			)}
			{cancelHandler && (
				<button onClick={cancelHandler}>
					<Icon name={'LuXCircle'} />
				</button>
			)}
			{removeHandler && (
				<button onClick={removeHandler}>
					<Icon name={'LuTrash2'} />
				</button>
			)}
		</div>
	);
};

export default AdminActions;
