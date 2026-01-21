/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-red': '#FF0033',
                'dark-bg': '#050505',
                'card-bg': '#111111',
            },
            fontFamily: {
                mono: ['monospace'], // Placeholder, can be swapped for a glitch font later
            }
        },
    },
    plugins: [],
}
