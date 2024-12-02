'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useActorEdit } from '@/app/(main)/admin/actors/[id]/useActorEdit';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import Button from '@/components/ui/form-elements/button/Button';
import Field from '@/components/ui/form-elements/field/Field';
import SlugField from '@/components/ui/form-elements/slug-field/SlugField';
import UploadField from '@/components/ui/form-elements/upload-field/UploadField';
import Heading from '@/components/ui/heading/Heading';

import { IActorEditInput } from '@/types/actor.types';

import { generateSlug } from '@/utils/string/generateSlug';

interface IActorEdit {
	actorId: string;
}

const ActorEdit = ({ actorId }: IActorEdit) => {
	const { actor, onSubmit, isLoading } = useActorEdit(actorId);

	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
		trigger,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
		values: {
			name: actor?.name || '',
			slug: actor?.slug || '',
			photoUrl: actor?.photoUrl || '',
		},
	});

	const handleSlugChange = () => {
		const slugValue = generateSlug(getValues('name'));
		setValue('slug', slugValue);
		trigger('slug');
	};

	return (
		<div className={'px-6'}>
			<Heading>Actor settings</Heading>
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

							<SlugField
								register={register}
								generate={handleSlugChange}
								error={errors.slug}
							/>

							<Controller
								name={'photoUrl'}
								control={control}
								defaultValue={''}
								render={({ field: { value, onChange }, fieldState: { error } }) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder={'actors'}
										placeholder={'Actor photo'}
										style={{ marginTop: 15 }}
									/>
								)}
								rules={{
									required: 'Photo is required',
								}}
							/>
						</div>

						<Button size={'sm'}>Save changes</Button>
					</>
				)}
			</form>
		</div>
	);
};

export default ActorEdit;
