import cn from 'clsx';
import React from 'react';

import { Icon } from '@/components/ui/Icon';

import styles from './SlideArrow.module.scss';

interface ISlideArrow {
	variant: 'left' | 'right';
	clickHandler: () => void;
}

const SlideArrow = ({ variant, clickHandler }: ISlideArrow) => {
	const isLeft = variant === 'left';

	return (
		<button
			className={cn(styles.arrow, { [styles.left]: isLeft, [styles.right]: !isLeft })}
			onClick={clickHandler}
		>
			<Icon className={styles.icon} name={isLeft ? 'LuChevronLeft' : 'LuChevronRight'} />
		</button>
	);
};

export default SlideArrow;
