/** @type {import('next').NextConfig} */
const serverUrl = process.env.SERVER_URL || 'http://188.40.22.225/';

const nextConfig = {
	env: {
		SERVER_URL: serverUrl,
		APP_URL: process.env.APP_URL,
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `http://188.40.22.225/uploads/:path*`,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '188.40.22.225',
				port: '80',
				pathname: '/uploads/**',
			},
		],
	},
};

export default nextConfig;
