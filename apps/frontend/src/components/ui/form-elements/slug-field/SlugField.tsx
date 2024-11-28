import React from 'react';

import Field from '@/components/ui/form-elements/field/Field';
import { ISlugField } from '@/components/ui/form-elements/form.interface';

import styles from './SlugField.module.scss';

const SlugField = ({ error, register, generate }: ISlugField) => {
	return (
		<div className={'relative'}>
			<Field
				{...register('slug', {
					required: 'Link is required',
				})}
				placeholder={'Link'}
				error={error}
			/>
			<div className={styles.badge} onClick={generate}>
				Generate
			</div>
		</div>
	);
};

export default SlugField;
