import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Helvetica', 'Arial', 'sans-serif'],
				helvetica: ['Helvetica', 'Arial', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				// New sequence brand colors - based on the uploaded brand guide
				sequence: {
					'teal': {
						DEFAULT: '#025864',
						50: '#E6F3F5',
						100: '#CCE8EB',
						200: '#99D1D7',
						300: '#66B9C3',
						400: '#33A2AF',
						500: '#025864',
						600: '#024857',
						700: '#01374A',
						800: '#01253C',
						900: '#00121F',
					},
					'green': {
						DEFAULT: '#00D47E',
						50: '#E6FBF2',
						100: '#CCF8E6',
						200: '#99F1CC',
						300: '#66EAB3',
						400: '#33E399',
						500: '#00D47E',
						600: '#00AA65',
						700: '#00804C',
						800: '#005532',
						900: '#002B19',
					},
				},
				
				// Keep existing color definitions
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// NitiSetu specific colors - using CSS variables for consistency
				"nitisetu": {
					50: "hsl(var(--nitisetu-50))",
					100: "hsl(var(--nitisetu-100))",
					200: "hsl(var(--nitisetu-200))",
					300: "hsl(var(--nitisetu-300))",
					400: "hsl(var(--nitisetu-400))",
					500: "hsl(var(--nitisetu-500))",
					600: "hsl(var(--nitisetu-600))",
					700: "hsl(var(--nitisetu-700))",
					800: "hsl(var(--nitisetu-800))",
					900: "hsl(var(--nitisetu-900))"
				},
				"success": {
					50: "hsl(var(--success-50))",
					100: "hsl(var(--success-100))",
					200: "hsl(var(--success-200))",
					300: "hsl(var(--success-300))",
					400: "hsl(var(--success-400))",
					500: "hsl(var(--success-500))",
					600: "hsl(var(--success-600))",
					700: "hsl(var(--success-700))",
					800: "hsl(var(--success-800))",
					900: "hsl(var(--success-900))"
				},
				"warning": {
					50: "hsl(var(--warning-50))",
					100: "hsl(var(--warning-100))",
					200: "hsl(var(--warning-200))",
					300: "hsl(var(--warning-300))",
					400: "hsl(var(--warning-400))",
					500: "hsl(var(--warning-500))",
					600: "hsl(var(--warning-600))",
					700: "hsl(var(--warning-700))",
					800: "hsl(var(--warning-800))",
					900: "hsl(var(--warning-900))"
				},
				"danger": {
					50: "hsl(var(--danger-50))",
					100: "hsl(var(--danger-100))",
					200: "hsl(var(--danger-200))",
					300: "hsl(var(--danger-300))",
					400: "hsl(var(--danger-400))",
					500: "hsl(var(--danger-500))",
					600: "hsl(var(--danger-600))",
					700: "hsl(var(--danger-700))",
					800: "hsl(var(--danger-800))",
					900: "hsl(var(--danger-900))"
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out'
			},
			spacing: {
				'18': '4.5rem',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
