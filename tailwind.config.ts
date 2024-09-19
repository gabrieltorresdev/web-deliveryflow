import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        ot: {
          50: "#ffecec",
          100: "#ffd4d4",
          200: "#ffb0b0",
          300: "#ff7878",
          400: "#ff2b2b",
          500: "#d40000",
          600: "#b80202",
          700: "#990000",
          800: "#7f0404",
          900: "#680909",
          950: "#3a0000",
        },
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-bullets": theme("colors.gray.500"),
            p: {
              margin: 0,
            },
            li: {
              p: {
                margin: 0,
              },
            },
          },
        },
      }),
    },
  },
};
