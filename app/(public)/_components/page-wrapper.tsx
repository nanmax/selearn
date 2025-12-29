"use client";

import { ReactNode, useEffect, useState } from "react";
import LoadingPage from "../loading";

export default function PageWrapper({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
      }, []);
      if (loading) {
        return <LoadingPage />
      }
      return <>{children}</>
}