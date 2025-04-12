import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        // [!code focus]
        center: true, // [!code focus]
        padding: {
          // [!code focus]
          DEFAULT: "24px", // [!code focus]
          sm: "24px", // [!code focus]
          lg: "24px", // [!code focus]
          xl: "0", // [!code focus]
        }, // [!code focus]
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1380px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
export default config;
