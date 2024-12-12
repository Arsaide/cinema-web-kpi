import Image from 'next/image';
import React from 'react';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { IUploadField } from '@/components/ui/form-elements/form.interface';
import { useUpload } from '@/components/ui/form-elements/upload-field/useUpload';

import styles from './UploadFiled.module.scss';

const UploadField = ({
	placeholder,
	error,
	style,
	folder,
	onChange,
	isNoImage = false,
	value,
}: IUploadField) => {
	const { uploadImage, isLoading } = useUpload(onChange, folder);

	return (
		<div className={styles.uploadField} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type={'file'} onChange={uploadImage} />
					{error && <div className={styles.error}>{error.message}</div>}
					{isLoading ? 'loading' : 'no loading'}
				</label>
				<div className={styles.container}>
					{isLoading ? (
						<SkeletonLoader className={'w-full h-full'} />
					) : (
						value && !isNoImage && <Image src={value} alt={''} fill unoptimized />
					)}
				</div>
			</div>
		</div>
	);
};

export default UploadField;
