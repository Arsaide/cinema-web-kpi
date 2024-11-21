/** @type {import('next').NextConfig} */
const serverUrl = process.env.SERVER_URL || 'http://localhost:4000/api/';

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
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'http://188.40.22.225/',
				port: '80',
				pathname: '/uploads/**',
			},
		],
	},
};

export default nextConfig;
