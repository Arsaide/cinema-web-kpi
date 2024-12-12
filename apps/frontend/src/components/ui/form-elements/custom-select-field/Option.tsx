import React, { MouseEventHandler } from 'react';

import { Icon, TypeIconName } from '@/components/ui/Icon';
import { SelectOption } from '@/components/ui/form-elements/form.interface';

import styles from './SelectField.module.scss';

interface IOption {
	option: SelectOption;
	onClick: (value: SelectOption['value']) => void;
	icons?: boolean;
}

const Option = (props: IOption) => {
	const {
		option: { value, title },
		onClick,
		icons,
	} = props;

	const handleClick =
		(clickedValue: SelectOption['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			onClick(clickedValue);
		};

	return (
		<li className={styles.option} value={value} onClick={handleClick(value)} tabIndex={0}>
			{icons ? (
				<span>
					<Icon name={title as TypeIconName} />
				</span>
			) : null}
			<span>{title}</span>
		</li>
	);
};

export default Option;
