
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
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
				pawblue: {
					50: '#f0f7ff',
					100: '#e0eefe',
					200: '#bae0fd',
					300: '#7cc8fb',
					400: '#36a9f6',
					500: '#1493e5',
					600: '#0675c3',
					700: '#045c9e',
					800: '#064d82',
					900: '#0a416c',
					950: '#07294a',
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
				'slide-in-right': {
					'0%': {
						transform: 'translateX(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'slide-out-left': {
					'0%': {
						transform: 'translateX(0)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(-100%)',
						opacity: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1'
					},
					'100%': {
						opacity: '0'
					}
				},
				'bounce-in': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'70%': {
						transform: 'scale(1.05)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'pulse-soft': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'swipe-right': {
					'0%': {
						transform: 'translateX(0) rotate(0)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(150%) rotate(15deg)',
						opacity: '0'
					}
				},
				'swipe-left': {
					'0%': {
						transform: 'translateX(0) rotate(0)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(-150%) rotate(-15deg)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-left': 'slide-out-left 0.3s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'bounce-in': 'bounce-in 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
				'swipe-right': 'swipe-right 0.5s ease-out forwards',
				'swipe-left': 'swipe-left 0.5s ease-out forwards'
			},
			backgroundImage: {
				'paw-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUuNDQgNC4wNkM1LjIzIDQuNyA1LjQ2IDUuNjkgNi4wMyA3LjA0QzYuNiA4LjM4IDcuMjEgOC45MSA3Ljc4IDguNjhDOC4zNiA4LjQ2IDguNjUgNy41MSA4LjE2IDYuMThDNy42NyA0Ljg0IDYuODUgNCA1LjQ0IDQuMDZaTTExLjQgNC4xN0MxMS41MyA0LjggMTEuNzUgNS45OSAxMS42NiA3LjQ5QzExLjU3IDkgMTEuMTUgOS43NSAxMC40OCA5LjgzQzkuODEgOS45MSA5LjA1IDkuMTYgOC45NyA3LjY2QzguODggNi4xNiA5LjEyIDUuMDcgOS43NyA0LjVDMTAuNDcgMy41MiAxMS4xNSAzLjE2IDExLjQgNC4xN1pNMTUuMDEgNC42MkMxNS41NyA1LjEzIDE2LjIzIDYuMTQgMTYuNzcgNy41NEMxNy4zIDguOTUgMTcuMjYgOS44MiAxNi42NiAxMC4yNEMxNi4wNiAxMC42NiAxNS4xMyAxMC4zNiAxNC41OSA4Ljk1QzE0LjA1IDcuNTUgMTQuMDEgNi40MiAxNC4zNSA1LjY0QzE0LjU3IDQuOTkgMTUgNC4zMiAxNS4wMSA0LjYyWk00IDE3LjE3QzQuMjcgMTYuMzcgNS4xMSAxNS42MSA2LjUxIDE0Ljg0QzcuOTIgMTQuMDggOC43OCAxMy44OSA5LjM1IDE0LjM1QzkuOTMgMTQuODEgOS44OCAxNS44MyA4LjYgMTYuOTFDNy4zMyAxNy45OSA2LjA5IDE4LjQ1IDQuOTcgMTguMzhDMy45IDE3Ljk4IDMuNjEgMTcuOTcgNCAxNy4xN1pNMTQuOTcgMTUuOTVDMTQuMjMgMTUuNzIgMTMuMiAxNS44NiAxMS45NSAxNi40NEMxMC43MSAxNy4wMSAxMC4xNCAxNy43NSAxMC4yNyAxOC4zOEMxMC40IDE5LjAxIDExLjI5IDE5LjQxIDEyLjUzIDE4Ljg0QzEzLjc3IDE4LjI3IDE0LjU2IDE3LjU3IDE0Ljc0IDE2Ljc5QzE0Ljk4IDE2LjA5IDE1LjEgMTYuMDIgMTQuOTcgMTUuOTVaTTE5LjMgMTIuODVDMTguODMgMTIuMjQgMTcuODIgMTEuODYgMTYuNDMgMTEuOTFDMTUuMDMgMTEuOTYgMTQuMjEgMTIuNDIgMTQuMTEgMTMuMTNDMTQgMTMuODQgMTQuNzcgMTQuNTMgMTYuMTcgMTQuNzlDMTcuNTYgMTUuMDQgMTguNTggMTQuODMgMTkuMDggMTQuMTdDMTkuNjEgMTMuNjUgMTkuNzcgMTMuNDYgMTkuMyAxMi44NVoiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
