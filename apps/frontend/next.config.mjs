/** @type {import('next').NextConfig} */
const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';

const nextConfig = {
	env: {
		SERVER_URL: serverUrl,
		APP_URL: process.env.APP_URL,
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${serverUrl}/uploads/:path*`,
			},
		];
	},
};

export default nextConfig;
