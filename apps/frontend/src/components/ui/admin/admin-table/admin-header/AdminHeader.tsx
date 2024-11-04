import React, { ChangeEvent, FC } from 'react';

import AdminCreateButton from '@/components/ui/admin/admin-table/admin-header/AdminCreateButton';
import SearchField from '@/components/ui/search-field/SearchField';

import styles from './AdminModule.module.scss';

interface IAdminHeader {
	onClick?: () => void;
	searchTerm: string;
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: FC<IAdminHeader> = ({ onClick, searchTerm, handleSearch }) => {
	return (
		<header className={styles.header}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{onClick && <AdminCreateButton onClick={onClick} />}
		</header>
	);
};

export default AdminHeader;
