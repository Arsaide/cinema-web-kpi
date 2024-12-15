import React, { CSSProperties } from 'react';
import type { FieldError } from 'react-hook-form';

import Loader from '@/components/ui/Loader';
import { useVideoUpload } from '@/components/ui/form-elements/upload-video-field/useVideoUpload';
import Heading from '@/components/ui/heading/Heading';

import styles from './UploadVideoField.module.scss';

interface IVideoUrl {
	quality: string;
	url: string;
}

interface IUploadVideoField {
	placeholder: string;
	error?: FieldError;
	style?: CSSProperties;
	folder?: string;
	value?: string[];
	onChange: (urls: string[]) => void;
}

const UploadVideoField = ({
	placeholder,
	error,
	style,
	folder,
	onChange,
	value = [],
}: IUploadVideoField) => {
	const { uploadVideo, isLoading } = useVideoUpload((videoUrls: IVideoUrl[]) => {
		const urls = videoUrls.map(video => video.url);
		onChange(urls);
	}, folder);

	const qualities = [480, 720, 1080, 1280, 1440];

	return (
		<div>
			<div className={styles.uploadField} style={style}>
				<div className={styles.uploadFlex}>
					<label>
						<span>{placeholder}</span>
						<input type='file' accept='video/*' onChange={uploadVideo} />
						{error && <div className={styles.error}>{error.message}</div>}
					</label>
					{isLoading && <Loader />}
				</div>
				{value.length > 0 && (
					<div className={styles.videoList}>
						<Heading className={styles.heading}>Available videos:</Heading>
						<ul className={styles.list}>
							{value.map((url, index) => (
								<li className={styles.item} key={index}>
									<a href={url} target='_blank' rel='noopener noreferrer'>
										View video {index + 1}, quality: {qualities[index] || 'unknown'}p
									</a>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default UploadVideoField;
