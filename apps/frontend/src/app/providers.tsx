'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, PropsWithChildren, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import StarsCanvas from '@/components/canvas/stars-canvas-bg/StarsCanvas';

const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		}),
	);

	return (
		<QueryClientProvider client={client}>
			<Toaster
				position={'top-center'}
				toastOptions={{
					duration: 2000,
					style: {
						background: '#333',
						color: '#fff',
					},
				}}
			/>
			{children}
			<StarsCanvas />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default Providers;
