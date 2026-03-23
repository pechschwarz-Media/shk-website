'use client';

import { Form } from '@/components/static/Form';
import getForm from '@/lib/queries/forms/getForm';

type Contact6ClientProps = {
    form: Awaited<ReturnType<typeof getForm>>;
};

export function Contact6Client({ form }: Contact6ClientProps) {
    return <Form form={form} />;
}
