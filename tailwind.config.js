const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/components/button.js',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        screens: {
            xll: '1248px',
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
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
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
    },
    plugins: [
        require('tailwindcss-animate'),
        nextui(),
        require('@tailwindcss/typography'),
    ],
}
