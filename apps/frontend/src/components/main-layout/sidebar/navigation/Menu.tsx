import React, { FC } from 'react';

import MenuItem from '@/components/main-layout/sidebar/navigation/MenuItem';
import { IMenu } from '@/components/main-layout/sidebar/navigation/menu.interface';

import styles from './Menu.module.scss';

const Menu: FC<{ menu: IMenu }> = ({ menu: { items, title } }) => {
	return (
		<div className={styles.menu}>
			<div className={styles.heading}>{title}</div>
			<div className={styles.items}>
				{items.length ? (
					items.map(item => <MenuItem key={item.link} item={item} />)
				) : (
					<div>Elements not found!</div>
				)}
			</div>
		</div>
	);
};

export default Menu;
