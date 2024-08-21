/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gimBuff: colors.sky["400"],
        gimDance: colors.blue["500"],
        gimDebuff: colors.rose["400"],
        // 体力・元気・バフが減少する時の色、一律赤色だった
        gimDecrease: colors.red["500"],
        // バフの中で持続効果に属するものの色
        gimEffectactivationbuff: colors.amber["500"],
        gimLife: colors.emerald["500"],
        gimVocal: colors.pink["500"],
        gimVisual: colors.amber["400"],
        gimVitality: colors.cyan["400"],
      },
    },
  },
  plugins: [],
};
