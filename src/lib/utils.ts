import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge, twMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
    override: {
        classGroups: {
            'font-size': [''],
            'text-color': [''],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return customTwMerge(clsx(inputs));
}
