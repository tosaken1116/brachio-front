const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "media",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			aspectRatio: {
				omikuji: "1/2",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"slide-left": {
					from: { transform: "translateX(-100%)" },
					to: { transform: "translateX(0)" },
				},
				"slide-right": {
					from: { transform: "translateX(100%)" },
					to: { transform: "translateX(0)" },
				},
				shake: {
					"0%": {
						transform: "rotate(0deg)",
					},
					"25%": {
						transform: "rotate(5deg)",
					},
					"50%": {
						transform: "rotate(-5deg)",
					},
					"75%": {
						transform: "rotate(5deg)",
					},
					"100%": {
						transform: "rotate(0deg)",
					},
				},
				"shake-large": {
					"0%": {
						transform: "rotate(0deg)",
					},
					"33.333%": {
						transform: "rotate(10deg)",
					},
					"66.666%": {
						transform: "rotate(-10deg)",
					},
					"100%": {
						transform: "rotate(0deg)",
					},
				},
				"spin-half": {
					"0%": {
						transform: "rotate(0deg)",
					},
					"100%": {
						transform: "rotate(180deg)",
					},
				},
				pop: {
					"0%": {
						transform: "translateY(0) translateX(50%)",
					},
					"30%": {
						transform: "translateY(-100%)  translateX(50%) scale(1)",
					},
					"60%": {
						transform:
							"translateY(-100%)  translateX(50%) scale(1) rotate(0deg)",
					},
					"100%": {
						transform: "scale(3) rotate(15deg)",
						"z-index": "100",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"slide-right": "slide-right 0.3s ease-out",
				"slide-left": "slide-left 0.3s ease-out",
				shake: "shake 0.5s infinite",
				"shake-large": "shake-large 0.3s 2",
				"spin-half": "spin-half 1s",
				pop: "pop 1.5s 1 2s",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
