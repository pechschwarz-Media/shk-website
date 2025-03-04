'use client';

import getForm from '@/lib/queries/forms/getForm';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { FormCheckbox, FormConsent, FormNumber, FormRadio, FormSelect, FormText, FormTextarea } from '../Input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../Button';

type FormProps = {
    form: Awaited<ReturnType<typeof getForm>>;
};

export type Inputs = {
    [key: string]: unknown;
};

export function Form({ form }: FormProps) {
    const hookForm = useForm<Inputs>();

    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState<boolean | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    async function onSubmit(data: Inputs) {
        setLoading(true);

        const response = await fetch('/api/form/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                form: form?.id,
                data,
            }),
        });

        const status = await response.json();

        setLoading(false);
        setValid(status?.status);
    }

    const router = useRouter();

    useEffect(() => {
        if (valid) {
            const confirmation = Object.values(form?.confirmations)[0];

            if (confirmation?.type === 'redirect') {
                router.push(confirmation?.url);
            }

            if (confirmation?.type === 'message') {
                setMessage(confirmation?.message);
            }
        } else if (valid === false) {
            setMessage('Ein Fehler ist aufgetreten.');
        }
    }, [valid]);

    return (
        <form onSubmit={hookForm.handleSubmit(onSubmit)}>
            {/* Start: Für das Grid benötigt – Nicht entfernen! */}
            {false && (
                <div className="hidden lg:col-span-1 lg:col-span-2 lg:col-span-3 clg:ol-span-4 lg:col-span-5 lg:col-span-6 lg:col-span-7 lg:col-span-8 lg:col-span-9 lg:col-span-10 lg:col-span-11 lg:col-span-12"></div>
            )}
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                {form.fields?.map((field, index) => {
                    return (
                        <div className={`col-span-12 lg:col-span-${field.layoutGridColumnSpan}`} key={index}>
                            {field?.type === 'text' && (
                                <>
                                    <label
                                        htmlFor={`input_${field?.id}`}
                                        className={cn('block mb-2', field?.labelPlacement === 'hidden_label' && 'sr-only')}
                                    >
                                        {field?.label}
                                    </label>
                                    <FormText field={field} id={`input_${field?.id}`} hookForm={hookForm} />
                                    {hookForm?.formState?.errors[`input_${field?.id}`] && <div>Feld ausfüllen!</div>}
                                </>
                            )}
                            {field?.type === 'number' && (
                                <>
                                    <label
                                        htmlFor={`input_${field?.id}`}
                                        className={cn('block mb-2', field?.labelPlacement === 'hidden_label' && 'sr-only')}
                                    >
                                        {field?.label}
                                    </label>
                                    <FormNumber field={field} id={`input_${field?.id}`} hookForm={hookForm} />
                                    {hookForm?.formState?.errors[`input_${field?.id}`] && <div>Feld ausfüllen!</div>}
                                </>
                            )}
                            {field?.type === 'textarea' && (
                                <>
                                    <label
                                        htmlFor={`input_${field?.id}`}
                                        className={cn('block mb-2', field?.labelPlacement === 'hidden_label' && 'sr-only')}
                                    >
                                        {field?.label}
                                    </label>
                                    <FormTextarea field={field} id={`input_${field?.id}`} hookForm={hookForm} rows={6} />
                                    {hookForm?.formState?.errors[`input_${field?.id}`] && <div>Feld ausfüllen!</div>}
                                </>
                            )}
                            {field?.type === 'select' && (
                                <>
                                    <label
                                        htmlFor={`input_${field?.id}`}
                                        className={cn('block mb-2', field?.labelPlacement === 'hidden_label' && 'sr-only')}
                                    >
                                        {field?.label}
                                    </label>
                                    <FormSelect field={field} id={`input_${field?.id}`} hookForm={hookForm} />
                                    {hookForm?.formState?.errors[`input_${field?.id}`] && <div>Feld ausfüllen!</div>}
                                </>
                            )}
                            {field?.type === 'radio' && (
                                <div>
                                    <div className={cn(field?.labelPlacement === 'hidden_label' && 'sr-only')}>{field?.label}</div>
                                    <FormRadio field={field} hookForm={hookForm} />
                                    {hookForm?.formState?.errors[`input_${field?.id}`] && <div>Feld ausfüllen!</div>}
                                </div>
                            )}
                            {field?.type === 'checkbox' && (
                                <div>
                                    <div className={cn(field?.labelPlacement === 'hidden_label' && 'sr-only')}>{field?.label}</div>
                                    <FormCheckbox field={field} hookForm={hookForm} />
                                    {hookForm?.formState?.errors[`input_${field?.id}`] && <div>Feld ausfüllen!</div>}
                                </div>
                            )}
                            {field?.type === 'consent' && (
                                <>
                                    <FormConsent field={field} id={`input_${field?.id}`} hookForm={hookForm} />
                                    {hookForm?.formState?.errors[`input_${field?.id}_1`] && <div>Feld ausfüllen!</div>}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="mt-6">
                <Button as="button" type="submit" variant="blueFilled">
                    {form?.button?.text}
                </Button>
                {message && <div className="bg-green-200 text-green-800 p-5 rounded-lg mt-6">{message}</div>}
            </div>
        </form>
    );
}
