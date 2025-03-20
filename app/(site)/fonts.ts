import localFont from "next/font/local";

export const mulish = localFont({
  src: [
    {
      path: "./fonts/Mulish-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Mulish-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Mulish-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Mulish-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],

  weight: "400 700", //range of weights
});
