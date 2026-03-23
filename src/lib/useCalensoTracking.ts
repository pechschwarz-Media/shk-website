'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
    }
}

export default function useCalensoTracking() {
    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            if (!event.data || !event.data.eventName) return;

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: event.data.eventName,
                ...event.data.bookingData,
            });
        }

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);
}
