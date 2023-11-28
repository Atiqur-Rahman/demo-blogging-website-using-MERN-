/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            white: '#FFFFFF',
            black: '#242424',
            gray: '#f3f3f3',
            'dark-gray': '#6b6b6b',
            red: '#ff4e4e',
            transparent: 'transparent',
            twitter: '#1da1f2',
            purple: '#8B46FF',
        },
        fontSize: {
            sm: '12px',
            base: '14px',
            xl: '16px',
            '2xl': '20px',
            '3xl': '28px',
            '4xl': '38px',
            '5xl': '50px',
        },
        extend: {
            fontFamily: {
                inter: ["'Inter'", 'sans-serif'],
                gelasio: ["'Gelasio'", 'serif'],
            },
        },
    },
    plugins: [],
};
