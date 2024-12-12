import React, { CSSProperties } from 'react';
import type { FieldError } from 'react-hook-form';

import styles from '@/components/ui/form-elements/upload-field/UploadFiled.module.scss';
import { useVideoUpload } from '@/components/ui/form-elements/upload-video-field/useVideoUpload';

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

	return (
		<div>
			<div className={styles.uploadField} style={style}>
				<div className={styles.uploadFlex}>
					<label>
						<span>{placeholder}</span>
						<input type='file' accept='video/*' onChange={uploadVideo} />
						{error && <div className={styles.error}>{error.message}</div>}
						{isLoading ? 'loading' : 'no loading'}
					</label>

					{value.length > 0 && (
						<div>
							<h4>Доступные видео:</h4>
							<ul>
								{value.map((url, index) => (
									<li key={index}>
										<a href={url} target='_blank' rel='noopener noreferrer'>
											{url}
										</a>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UploadVideoField;
