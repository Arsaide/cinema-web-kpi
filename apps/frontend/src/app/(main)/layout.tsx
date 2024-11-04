import { FC, PropsWithChildren } from 'react';

import MainLayout from '@/components/main-layout/MainLayout';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return <MainLayout>{children}</MainLayout>;
};

export default Layout;
