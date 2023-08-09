import React from "react";

import BottomNav from "@/components/common/BottomNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}
