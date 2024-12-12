import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { fileService } from '@/api/services/file/file.service';

type VideoUploadResponse = {
	videoUrls: { quality: string; url: string }[];
	duration: number;
	type: string;
};

type TypeVideoUpload = (
	onChange?: (videoUrls: { quality: string; url: string }[]) => void,
	folder?: string,
) => {
	uploadVideo: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
	isLoading: boolean;
};

export const useVideoUpload: TypeVideoUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { mutateAsync } = useMutation({
		mutationKey: ['upload video', folder],
		mutationFn: (data: FormData) => fileService.upload(data, folder),
		onSuccess: response => {
			const videoData = response.data[0];

			if ((videoData as VideoUploadResponse).videoUrls) {
				const videoUrls = (videoData as VideoUploadResponse).videoUrls;
				onChange!(videoUrls);
			} else {
				console.error('Не удалось найти videoUrls в ответе:', videoData);
				toast.error('Ошибка загрузки видео');
			}
		},
		onError: () => {
			toast.error('Ошибка загрузки видео');
		},
	});

	const uploadVideo = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			const files = event.target.files;

			if (files?.length) {
				setIsLoading(true);
				const formData = new FormData();
				formData.append('file', files[0]);

				try {
					await mutateAsync(formData);
				} finally {
					setIsLoading(false);
				}
			}
		},
		[mutateAsync],
	);

	return useMemo(() => ({ uploadVideo, isLoading }), [uploadVideo, isLoading]);
};
