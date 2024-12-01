'use client';

import React, {
	ChangeEvent,
	InputHTMLAttributes,
	MouseEventHandler,
	useEffect,
	useRef,
	useState,
} from 'react';
import { FieldError } from 'react-hook-form';

import { Icon, TypeIconName } from '@/components/ui/Icon';
import { SelectOption } from '@/components/ui/form-elements/form.interface';
import Option from '@/components/ui/form-elements/select-field/Option';

import styles from './SelectField.module.scss';

interface ISelectField extends InputHTMLAttributes<HTMLDivElement> {
	selected: SelectOption | null;
	options: SelectOption[];
	placeholder?: string;
	status?: 'default' | 'invalid';
	onSelectChange?: (selected: SelectOption['value']) => void;
	onClose?: () => void;
	icons?: boolean;
	error?: FieldError | undefined;
}

const SelectField = ({
	selected,
	options,
	placeholder,
	status = 'default',
	onSelectChange,
	onClose,
	icons = false,
	error,
	style,
}: ISelectField) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [visibleOptions, setVisibleOptions] = useState<SelectOption[]>([]);
	const [loadedCount, setLoadedCount] = useState<number>(20);
	const ref = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);

	const filteredOptions = searchTerm
		? options.filter(option =>
				option.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
			)
		: options;

	useEffect(() => {
		const loadOptions = () => {
			const newOptions = filteredOptions.slice(0, loadedCount);
			setVisibleOptions(newOptions);
		};
		loadOptions();
	}, [filteredOptions, loadedCount]);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !ref.current?.contains(target)) {
				isOpen && onClose?.();
				setIsOpen(false);
				setLoadedCount(20);
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	});

	useEffect(() => {
		const placeholderEl = placeholderRef.current;
		if (!placeholderEl) return;

		const handleClick = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				setIsOpen(!isOpen);
			}
		};

		placeholderEl.addEventListener('keydown', handleClick);

		return () => {
			placeholderEl.removeEventListener('keydown', handleClick);
		};
	}, []);

	const handleOptionClick = (value: SelectOption['value']) => {
		setIsOpen(false);
		setSearchTerm('');
		onSelectChange?.(value);
	};

	const handlePlaceholderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionsSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		setLoadedCount(20);
	};

	const handleScroll = (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
		const bottom =
			event.currentTarget.scrollHeight ===
			event.currentTarget.scrollTop + event.currentTarget.clientHeight;
		if (bottom && loadedCount < filteredOptions.length) {
			setLoadedCount(prevCount => prevCount + 20);
		}
	};

	return (
		<div className={'flex flex-col'} style={style}>
			<span className={styles.label}>{placeholder}</span>
			<div ref={ref} className={styles.field} data-is-active={isOpen}>
				<div className={styles.arrow}>
					<Icon name={'LuArrowDown'} />
				</div>
				<div
					ref={placeholderRef}
					className={styles.value}
					data-status={status}
					data-selected={!!selected?.value}
					onClick={handlePlaceholderClick}
					role={'button'}
					tabIndex={0}
				>
					{selected?.title && icons ? (
						<span className={styles.icon}>
							<Icon name={selected?.title as TypeIconName} />
						</span>
					) : null}
					<span className={styles.placeholder}>
						{!selected?.title && placeholder ? placeholder : ''}
					</span>
					<span className={styles.title}>{selected?.title}</span>
				</div>
				{isOpen && (
					<div className={styles.dropdown}>
						<input
							className={styles.search}
							type={'text'}
							placeholder={'Searching...'}
							value={searchTerm}
							onChange={handleOptionsSearch}
						/>
						<ul className={styles.select} onScroll={handleScroll}>
							{filteredOptions.length === 0 ? (
								<li className={styles.empty}>Ничего не найдено</li>
							) : (
								visibleOptions.map(option => (
									<Option
										key={option.value}
										option={option}
										onClick={handleOptionClick}
										icons={icons}
									/>
								))
							)}
						</ul>
					</div>
				)}
			</div>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	);
};

export default SelectField;
