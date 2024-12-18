import { axiosWithAuth } from '@/api/interceptors';

import { API_URL } from '@/config/api.config';

interface IFile {
	url: string;
	name: string;
	videoUrls?: { quality: string; url: string }[];
	duration?: number;
	type?: string;
}

class FileService {
	async upload(file: FormData, folder?: string) {
		return axiosWithAuth.post<IFile[]>(API_URL.files(''), file, {
			params: {
				folder,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	async delete(path: string) {
		return axiosWithAuth.post(API_URL.files('/delete'), path);
	}
}

export const fileService = new FileService();
