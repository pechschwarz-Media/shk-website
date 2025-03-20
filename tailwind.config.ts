import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    	fontFamily: {
    		body: 'var(--font-panton)',
    		headline: 'var(--font-hongkong)'
    	},
    	fontWeight: {
    		light: '300',
    		normal: '400',
    		bold: '700'
    	},
    	screens: {
    		sm: '576px',
    		md: '768px',
    		lg: '992px',
    		xl: '1200px',
    		xxl: '1440px'
    	},
    	container: {
    		center: true,
    		padding: '0.75rem'
    	},
    	fontSize: {
    		tiny: '0.75rem',
    		small: '0.875rem',
    		base: '1rem',
    		large: '1.125rem',
    		h1: 'clamp(2.1875rem, 0.1683rem + 5.609vw, 4.375rem)',
    		h2: 'clamp(1.5rem, 0.1154rem + 3.8462vw, 3rem)',
    		h3: 'clamp(1.25rem, 0.0962rem + 3.2051vw, 2.5rem)',
    		h4: 'clamp(1.5rem, 1.0385rem + 1.2821vw, 2rem)',
    		h5: '1.5rem',
    		h6: '1.25rem',
    		scrolltext: 'clamp(1.5rem, 1.1538rem + 1.9231vw, 2.5rem)',
    		boxNumber: 'clamp(1.5625rem, 1.25rem + 1vw, 2rem)'
    	},
    	extend: {
    		colors: {
    			light: '#e8e8e8',
    			dark: '#171D1A',
    			gray: '#7A7A7A',
    			'gray-medium': '#EBEAE6',
    			'gray-light': '#F5F5F3',
    			blue: '#0B2D44',
    			customer: '#2B94A6',
    			baederwelt: '#2B94A6',
    			fliesenwelt: '#CBC5A7',
    			energiesparwelt: '#A2C62C',
    			'customer-bg': '#F4F3EF',
    			partner: '#F47630',
    			'partner-bg': '#F7F7F7',
    			'background-gray': '#F4F5F0',
    			'tabelle-border': '#d7d6d4',
    			'tabelle-background': '#eae9e6',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			normal: '20px',
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		animation: {
    			logos: 'right-to-left 40s linear infinite'
    		},
    		keyframes: {
    			'right-to-left': {
    				'0%': {
    					transform: 'translateX(0)'
    				},
    				'100%': {
    					transform: 'translateX(-50%)'
    				}
    			}
    		}
    	}
    },
    plugins: [require("@tailwindcss/typography"), require("@relume_io/relume-tailwind"), require("tailwindcss-animate")],
};
export default config;
