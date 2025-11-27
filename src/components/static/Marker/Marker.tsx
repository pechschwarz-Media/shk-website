'use client';

import markerSDK from '@marker.io/browser';
import { useEffect } from 'react';

export default function Marker() {
    useEffect(() => {
        async function init() {
            const widget = await markerSDK.loadWidget({
                project: '6928023ccfe84caa90adf7a4',
            });
        }

        init();
    }, []);

    return null;
}
