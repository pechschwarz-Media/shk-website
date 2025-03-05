import { cn } from '@/lib/utils';

export default function RoundCheck({ className }: { className?: string }) {
    return (
        <svg width="39" height="38" viewBox="0 0 39 38" fill="none" className={cn('size-6', className)} xmlns="http://www.w3.org/2000/svg">
            <path
                id="Vector"
                d="M19.5 1.49976C29.1644 1.49976 37 9.33538 37 18.9998C37 28.6641 29.1644 36.4998 19.5 36.4998C9.83562 36.4998 2 28.6641 2 18.9998C2 9.33538 9.83562 1.49976 19.5 1.49976Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                id="Vector_2"
                d="M12 19.0928L17.5878 26.4998L29 11.4998"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
