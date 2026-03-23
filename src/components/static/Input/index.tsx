import IconCheck from '@/components/icons/IconCheck';
import { FormField } from '@/lib/types';
import parse from 'html-react-parser';
import { UseFormReturn } from 'react-hook-form';
import { Inputs } from '../Form';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type FormInputProps = InputProps & {
    field: FormField;
    hookForm: UseFormReturn<Inputs, any, undefined>;
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type FormTextareaProps = TextareaProps & {
    field: FormField;
    hookForm: UseFormReturn<Inputs, any, undefined>;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    children?: React.ReactNode;
};
type FormSelectProps = SelectProps & {
    field: FormField;
    hookForm: UseFormReturn<Inputs, any, undefined>;
};

export function Input({ ...props }: InputProps) {
    return (
        <input
            type={props?.type}
            placeholder={props?.placeholder}
            {...props}
            className="h-12 rounded-full bg-gray-medium/70 outline-none px-5 border border-blue w-full"
        />
    );
}

export function Textarea({ ...props }: TextareaProps) {
    return (
        <textarea
            placeholder={props?.placeholder}
            {...props}
            className="p-5 rounded-lg bg-gray-medium/70 outline-none border border-blue w-full"
        ></textarea>
    );
}

export function Select({ children, ...props }: SelectProps) {
    return (
        <select {...props} className="h-12 px-5 rounded-lg bg-gray-medium/70 outline-none border border-blue w-full">
            {children}
        </select>
    );
}

export function Radio({ ...props }: InputProps) {
    return <input type="radio" placeholder={props?.placeholder} className="size-4 accent-blue" {...props} />;
}

export function Checkbox({ ...props }: InputProps) {
    return (
        <div className="relative">
            <input type="checkbox" placeholder={props?.placeholder} {...props} className="absolute opacity-0 peer" />
            <div className="size-5 rounded-sm border bg-gray-medium/70 border-blue flex items-center justify-center peer-checked:*:opacity-100">
                <IconCheck className="size-4 opacity-0" />
            </div>
        </div>
    );
}

export function FormText({ field, hookForm, ...props }: FormInputProps) {
    return <Input type="text" {...hookForm.register('input_' + field?.id, { required: field?.isRequired })} {...props} />;
}

export function FormEmail({ field, hookForm, ...props }: FormInputProps) {
    return <Input type="email" {...hookForm.register('input_' + field?.id, { required: field?.isRequired })} {...props} />;
}

export function FormNumber({ field, hookForm, ...props }: FormInputProps) {
    return <Input type="number" {...hookForm.register('input_' + field?.id, { required: field?.isRequired })} {...props} />;
}

export function FormTextarea({ field, hookForm, ...props }: FormTextareaProps) {
    return <Textarea {...hookForm.register('input_' + field?.id, { required: field?.isRequired })} {...props} />;
}

export function FormSelect({ field, hookForm, ...props }: FormSelectProps) {
    return (
        <Select {...hookForm.register('input_' + field?.id, { required: field?.isRequired })} {...props}>
            {field?.choices?.map((choice, index) => {
                if (choice?.isSelected) {
                    return (
                        <option value={choice.value} selected key={index}>
                            {choice?.text}
                        </option>
                    );
                } else {
                    return (
                        <option value={choice.value} key={index}>
                            {choice?.text}
                        </option>
                    );
                }
            })}
        </Select>
    );
}

export function FormRadio({ field, hookForm, ...props }: FormInputProps) {
    return (
        <div>
            {field?.choices?.map((choice, index) => {
                if (choice?.isSelected) {
                    return (
                        <label key={index} className="flex items-center gap-2">
                            <Radio
                                {...hookForm.register('input_' + field?.id, { required: field?.isRequired })}
                                value={choice?.value}
                                defaultChecked
                                {...props}
                            />
                            <div className="flex-1">{choice?.text}</div>
                        </label>
                    );
                } else {
                    return (
                        <label key={index} className="flex items-center gap-2">
                            <Radio {...hookForm.register('input_' + field?.id, { required: field?.isRequired })} value={choice?.value} {...props} />
                            <div className="flex-1">{choice?.text}</div>
                        </label>
                    );
                }
            })}
        </div>
    );
}

export function FormCheckbox({ field, hookForm, ...props }: FormInputProps) {
    return (
        <>
            {field?.choices?.map((choice, index) => {
                if (choice?.isSelected) {
                    return (
                        <label key={index}>
                            <Checkbox
                                {...hookForm.register('input_' + field?.id + '_' + (index + 1), { required: field?.isRequired })}
                                value={choice?.value}
                                {...props}
                                defaultChecked
                            />
                            {choice?.text}
                        </label>
                    );
                } else {
                    return (
                        <label key={index}>
                            <Checkbox
                                {...hookForm.register('input_' + field?.id + '_' + (index + 1), { required: field?.isRequired })}
                                value={choice?.value}
                                {...props}
                            />
                            {choice?.text}
                        </label>
                    );
                }
            })}
        </>
    );
}

export function FormConsent({ field, hookForm, ...props }: FormTextareaProps) {
    return (
        <label className="flex items-center gap-2">
            <Checkbox {...hookForm.register('input_' + field?.id + '_1', { required: true })} value="1" />
            {parse(field?.checkboxLabel)}
        </label>
    );
}
