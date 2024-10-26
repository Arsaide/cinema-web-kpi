'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { ConfirmEmailError } from '@/app/auth/confirm/confirm-error.types';
import { useConfirmQuery } from '@/app/auth/confirm/useConfirmQuery';

import Button from '@/components/ui/form-elements/button/Button';

import { PUBLIC_URL } from '@/config/url.config';

import styles from './Confirm.module.scss';

const Confirm = () => {
	const searchParams = useSearchParams();
	const { push, refresh } = useRouter();

	const confirmToken = searchParams.get('token') || '';

	const { data, isPending, isSuccess, error } = useConfirmQuery(confirmToken);

	const errorMessage = error as ConfirmEmailError;

	useEffect(() => {
		if (isSuccess) {
			const timer = setTimeout(() => {
				toast.success('Confirm email successful! You can now log-in!');
				push(PUBLIC_URL.auth());
				refresh();
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [data]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.centeredBlock}>
				<h1 className={styles.title}>✉️ Confirmation email</h1>
				{isPending ? (
					'Email confirmation. This may take up to 1 minute'
				) : (
					<>
						{data ? (
							<p className={styles.message}>{data.message}</p>
						) : (
							error && (
								<div className={styles.message}>
									<span className={styles.error}>{errorMessage.message}: </span> <br />
									{errorMessage.response.data.message}
								</div>
							)
						)}
						<Link href={PUBLIC_URL.auth()}>
							<Button className={styles.button}>Go back</Button>
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Confirm;
