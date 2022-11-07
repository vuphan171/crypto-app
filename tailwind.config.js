/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            maxHeight: {
                '99999': '999999px'
            },
            marginLeft: {
                '0.5': '2px'
            },
            minWidth: {
                '6': '24px',
                '7': '28px',
                '9': '36px',
                '10': '40px'
            }
        },
    },
    darkMode: 'class',
    plugins: [],
    corePlugins: {
        preflight: true,
    }
}
