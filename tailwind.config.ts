import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/**/*.{html,ts}', // Scans all HTML and TS files in src
    ],
    theme: {
        extend: {
            // Example: Add a custom color
            colors: {
                primary: '#1d4ed8',
            },
        },
    },
    plugins: [],
};

export default config;
