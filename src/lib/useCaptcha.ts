'use client';

import { useState } from 'react';

export default function useCaptcha() {
    const [token, setToken] = useState<null | string>('');
    const [valid, setValid] = useState(false);

    async function validate() {
        if (valid) {
            return valid;
        }

        const response = await fetch('/api/captcha/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token || '',
            }),
        });

        const data = await response.json();

        setValid(data?.success);

        return data?.success;
    }

    return { setToken, validate };
}
