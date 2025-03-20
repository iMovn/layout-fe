"use client";

import React from "react";
import AdsBanner from "./AdsBanner";
import HeaderMain from "./HeaderMain";
import HeaderBottom from "./HeaderBottom";

export default function Header() {
  return (
    <header>
      <AdsBanner />
      <HeaderMain />
      <HeaderBottom />
    </header>
  );
}
