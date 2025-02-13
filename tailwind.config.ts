import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            body: 'var(--font-panton)',
            headline: 'var(--font-hongkong)',
        },
        fontWeight: {
            light: '300',
            normal: '400',
            bold: '700',
        },
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1440px',
        },
        container: {
            center: true,
            padding: '0.75rem',
        },
        fontSize: {
            tiny: '0.75rem',
            small: '0.875rem',
            base: '1rem',
            large: '1.125rem',
            h1: 'clamp(2.1875rem, 0.1683rem + 5.609vw, 4.375rem)',
            h2: 'clamp(1.5rem, 0.1154rem + 3.8462vw, 3rem);',
            h3: 'clamp(1.25rem, 0.0962rem + 3.2051vw, 2.5rem);)',
            h4: 'clamp(1.5rem, 1.0385rem + 1.2821vw, 2rem)',
            h5: '1.5rem',
            h6: '1.25rem',
        },
        extend: {
            colors: {
                dark: '#171D1A',
                gray: '#7A7A7A',
                blue: '#0B2D44',
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), require('@relume_io/relume-tailwind')],
};
export default config;
