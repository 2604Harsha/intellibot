"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootEntry() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // TEMPORARILY DISABLED: localstorage check so you can test the intro animation
    // const hasSeenIntro = localStorage.getItem("intro_seen");
    
    // Defer routing to ensure Next.js router is fully initialized
    const t = setTimeout(() => {
      // if (hasSeenIntro === "true") {
      //   router.replace("/auth");
      // } else {
        router.replace("/intro");
      // }
    }, 50);

    return () => clearTimeout(t);
  }, [router]);

  // Prevent flash of content during hydration checking
  if (!isMounted) return <div className="min-h-screen bg-[#05060A]" />;

  return null;
}
