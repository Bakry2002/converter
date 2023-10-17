const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
        screens: {
            xs: '475px',
            sm: '640px',
            md: '768px',
            xmd: '900px',
            lg: '1024px',
            xl: '1248px',
            '2xl': '1536px',
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
                'progress-bar-stripes': {
                    from: { backgroundPosition: '1rem 0' },
                    to: { backgroundPosition: '0 0' },
                },
                pulse: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.8 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'progress-bar-stripes':
                    'progress-bar-stripes 1s linear infinite',
            },
            backgroundImage: {
                'hero-gradient-text':
                    'linear-gradient( 120deg, #F11A7B 10%, #feff9c  )',
                'hero-gradient-bg':
                    'linear-gradient( -45deg, rgba(241, 26, 123, .33) 50%, rgba(254, 255, 172, .33) 50% )',
            },
            colors: {
                primary: '#F11A7B',
                secondary: '#feff9c ',
            },
            boxShadow: {
                basic: '-1px 17px 31px -29px',
            },
        },
        backgroundImage: {
            'hero-gradient-text':
                'linear-gradient( 120deg, #F11A7B 10%, #feff9c  )',
            'hero-bg': 'url("/images/hero.jpg")',
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        nextui(),
        require('@tailwindcss/typography'),
    ],
}
