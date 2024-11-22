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
				source: process.env.REWRITES_SOURCE,
				destination: process.env.REWRITES_DESTINATION,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: process.env.PROTOCOL,
				hostname: process.env.HOSTNAME,
				port: process.env.PORT,
				pathname: process.env.PATHNAME,
			},
		],
	},
};

export default nextConfig;
