export const customAnimations = {
  keyframes: {
    "flash-glide": {
      "0%": { left: "-100%" },
      "100%": { left: "100%" },
    },
    rotateY: {
      "0%": { transform: "rotateY(0deg)" },
      "100%": { transform: "rotateY(360deg)" },
    },
  },
  animation: {
    "flash-glide": "flash-glide 0.6s ease-out 1",
    rotateY: "rotateY 1s ease-out 1",
  },
};
