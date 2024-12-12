import type { EditorProps } from 'draft-js';
import type { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes } from 'react';
import type { ControllerRenderProps, FieldError, UseFormRegister } from 'react-hook-form';
import type { Options } from 'react-select';

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string;
	error?: FieldError;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'outline';
	size?: 'sm' | 'md';
}

export interface ISlugField {
	error?: FieldError;
	register: UseFormRegister<any>;
	generate: () => void;
}

type TypeEditorField = EditorProps & IField;

export interface ITextEditor extends Omit<TypeEditorField, 'editorState'> {
	onChange: (...event: any[]) => void;
	value: string;
}

export interface IOption {
	label: string;
	value: string;
}

export interface ISelect {
	placeholder?: string;
	options: Options<IOption>;
	error?: FieldError;
	isMulti?: boolean;
	field: ControllerRenderProps<any, any>;
	isLoading?: boolean;
}

export interface SelectOption {
	title: string;
	value: string;
}

export interface IUploadField {
	folder?: string;
	value?: string;
	onChange: (...event: any[]) => void;
	placeholder: string;
	error?: FieldError;
	style?: CSSProperties;
	isNoImage?: boolean;
}
