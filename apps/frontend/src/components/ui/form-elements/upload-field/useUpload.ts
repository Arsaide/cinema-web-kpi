import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { fileService } from '@/api/services/file/file.service';

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string,
) => {
	uploadImage: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
	isLoading: boolean;
};

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { mutateAsync } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => fileService.upload(data, folder),
		onSuccess({ data }) {
			onChange(data[0].url);
		},
		onError() {
			toast.error('Uploading file error');
		},
	});

	const uploadImage = useCallback(
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

	return useMemo(() => ({ uploadImage, isLoading }), [uploadImage, isLoading]);
};
