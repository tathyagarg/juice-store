import catppuccin from "@catppuccin/tailwindcss"

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  
  theme: {
    extend: {}
  },

  safelist: [
    "ctp-latte",
    "ctp-frappe",
    "ctp-macchiato",
    "ctp-mocha",
  ],

  plugins: [
    catppuccin({
      prefix: "ctp"
    })
  ]
};