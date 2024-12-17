'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useUserEdit } from '@/app/(main)/admin/users/[id]/useUserEdit';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import Button from '@/components/ui/form-elements/button/Button';
import Field from '@/components/ui/form-elements/field/Field';
import Select from '@/components/ui/form-elements/select-field/Select';
import UploadField from '@/components/ui/form-elements/upload-field/UploadField';
import Heading from '@/components/ui/heading/Heading';

import { IUserEditInput, UserRole } from '@/types/user.types';

interface IUserEdit {
	userId: string;
}

const UserEdit = ({ userId }: IUserEdit) => {
	const { user, onSubmit, isLoading } = useUserEdit(userId);

	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
	} = useForm<IUserEditInput>({
		mode: 'onChange',
		values: {
			name: user?.name || '',
			email: user?.email || '',
			role: user?.role || UserRole.USER,
			avatarPath: user?.avatarPath || '/uploads/default-avatar.png',
		},
	});

	const roles = [
		{
			label: 'User',
			value: UserRole.USER,
		},
		{
			label: 'Admin',
			value: UserRole.ADMIN,
		},
	];

	return (
		<div className={'px-6'}>
			<Heading>User settings</Heading>
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<div className={'space-y-4'}>
						{Array.from({ length: 3 }).map((_, index) => (
							<SkeletonLoader key={index} className={'h-10'} />
						))}
					</div>
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required',
								})}
								placeholder={'Name'}
								error={errors.name}
							/>

							<Field
								{...register('email', {
									required: 'Email is required',
								})}
								placeholder={'Email'}
								error={errors.email}
							/>

							<Controller
								name={'role'}
								control={control}
								rules={{ required: 'Please select option' }}
								render={({ field, fieldState: { error } }) => (
									<Select
										error={error}
										placeholder={'Actors'}
										isMulti={false}
										options={roles}
										field={field}
									/>
								)}
							/>

							<Controller
								name={'avatarPath'}
								control={control}
								defaultValue={''}
								render={({ field: { value, onChange }, fieldState: { error } }) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder={`users/${userId}`}
										placeholder={'User avatar'}
										style={{ marginTop: 15 }}
									/>
								)}
							/>
						</div>

						<Button size={'sm'}>Save changes</Button>
					</>
				)}
			</form>
		</div>
	);
};

export default UserEdit;
